import { OAuth2RequestError } from 'arctic';
import { cookies } from 'next/headers';
import { github, lucia } from '@/lib/auth';
import { sql } from '@/lib/db';
import type { DatabaseAccount, DatabaseUser } from '@/lib/db';

const getMainEmail = async (accessToken: string) => {
  const emailRes = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'lucia-playground',
    },
  });
  if (emailRes.ok) {
    const emails = (await emailRes.json()) as GitHubEmailRes[];
    return emails.find((email) => email.primary) ?? emails[0];
  }
};

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
    const githubUser: GitHubUser & { email_verified?: boolean } = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        'User-Agent': 'lucia-playground',
      },
    }).then(async (res) => await res.json());
    if (!githubUser.email) {
      // If the user does not have a public email, get another via the GitHub API
      // See https://docs.github.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
      const mainEmail = await getMainEmail(tokens.accessToken);
      if (mainEmail) {
        githubUser.email = mainEmail.email;
        githubUser.email_verified = mainEmail.verified ?? false;
      }
    }

    if (!githubUser.email) {
      return new Response('No primary email address', {
        status: 400,
      });
    }

    const existingAccount = (await sql`
      SELECT * FROM oauth_accounts
      WHERE provider_name = 'github' AND provider_user_id = ${githubUser.id}`) as DatabaseAccount[] | undefined;

    if (existingAccount?.[0]) {
      await sql`
      UPDATE users
      SET last_login = CURRENT_TIMESTAMP
      WHERE id = ${existingAccount?.[0].user_id}`;
      const session = await lucia.createSession(existingAccount?.[0].user_id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      });
    }

    const existingUser = (await sql`
    SELECT * FROM users
    WHERE email = ${githubUser.email}`) as DatabaseUser[] | undefined;

    let userId = existingUser?.[0] ? existingUser?.[0].id : '';

    if (!existingUser?.[0]) {
      const mainEmail = await getMainEmail(tokens.accessToken);
      if (mainEmail) {
        githubUser.email = mainEmail.email;
        githubUser.email_verified = mainEmail.verified ?? false;
      }

      const idRecord = await sql`INSERT INTO users (username, name, email, email_verified, image_url)
      VALUES (${githubUser.login}, ${githubUser.name}, ${githubUser.email}, ${githubUser.email_verified}, ${githubUser.avatar_url})
      RETURNING id`;

      userId = idRecord?.[0].id;

      await sql`INSERT INTO oauth_accounts (provider_name, provider_user_id, user_id)
      VALUES ('github', ${String(githubUser.id)}, ${userId})`;

      await sql`INSERT INTO permissions (role, user_id)
      VALUES ('user', ${userId})`;
    } else {
      if (existingUser?.[0].email_verified) {
        await sql`INSERT INTO oauth_accounts (provider_name, provider_user_id, user_id)
        VALUES ('github', ${String(githubUser.id)}, ${existingUser?.[0].id})`;
      } else {
        const mainEmail = await getMainEmail(tokens.accessToken);
        if (mainEmail) {
          githubUser.email = mainEmail.email;
          githubUser.email_verified = mainEmail.verified ?? false;
        }
      }

      if (githubUser.email_verified) {
        await sql`UPDATE users
        SET email_verified = ${true}
        WHERE id = ${existingUser?.[0].id}`;
      } else {
        return new Response('Unverified email', {
          status: 400,
        });
      }
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
