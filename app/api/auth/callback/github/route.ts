import { OAuth2RequestError } from 'arctic';
import { generateId, generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { github, lucia } from '@/lib/auth';
import { db } from '@/lib/db';
import type { DatabaseAccount, DatabaseUser } from '@/lib/db';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('github_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUser: GitHubUser & { email_verified: boolean } = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        'User-Agent': 'lucia-playground',
      },
    }).then(async (res) => await res.json());
    if (!githubUser.email) {
      // If the user does not have a public email, get another via the GitHub API
      // See https://docs.github.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          'User-Agent': 'lucia-playground',
        },
      });
      if (emailRes.ok) {
        const emails = (await emailRes.json()) as GitHubEmailRes[];
        const mainEmail = emails.find((email) => email.primary) ?? emails[0];
        githubUser.email = mainEmail.email;
        githubUser.email_verified = mainEmail.verified ?? false;
      }
    }

    if (!githubUser.email) {
      return new Response('No primary email address', {
        status: 400,
      });
    }

    const existingAccount = db
      .prepare('SELECT * FROM oauth_account WHERE provider_name = ? AND provider_user_id = ?')
      .get('github', githubUser.id) as DatabaseAccount | undefined;

    if (existingAccount) {
      db.prepare('UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(existingAccount.user_id);
      const session = await lucia.createSession(existingAccount.user_id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      });
    }

    const existingUser = (await db.prepare('SELECT * FROM user WHERE email = ?').get(githubUser.email)) as
      | DatabaseUser
      | undefined;

    const userId = existingUser ? existingUser.id : generateIdFromEntropySize(15);

    if (existingUser?.email_verified) {
      db.prepare('INSERT INTO oauth_account (provider_name, provider_user_id, user_id) VALUES (?, ?, ?)').run(
        'github',
        githubUser.id,
        existingUser.id,
      );
    } else {
      if (!githubUser.email_verified) {
        return new Response('Unverified email', {
          status: 400,
        });
      }
      db.prepare(
        'INSERT INTO user (id, username, name, email, email_verified, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      ).run(
        userId,
        githubUser.login,
        githubUser.name,
        githubUser.email,
        githubUser.email_verified ? 1 : 0,
        githubUser.avatar_url,
      );

      db.prepare('INSERT INTO oauth_account (provider_name, provider_user_id, user_id) VALUES (?, ?, ?)').run(
        'github',
        String(githubUser.id),
        userId,
      );
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string | null;
  name: string | null;
  email: string | null;
}

interface GitHubEmailRes {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: 'private' | 'public' | null;
}
