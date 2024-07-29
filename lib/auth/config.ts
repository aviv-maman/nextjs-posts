import { NeonHTTPAdapter } from '@lucia-auth/adapter-postgresql';
import { GitHub } from 'arctic';
import { Lucia } from 'lucia';
import type { User as LuciaUser } from 'lucia';
import { sql } from '@/lib/db';
import type { DatabaseAccount, DatabasePermission, DatabaseUser } from '@/lib/db';

const adapter = new NeonHTTPAdapter(sql, {
  user: 'users',
  session: 'sessions',
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      emailVerified: attributes.email_verified,
      name: attributes.name,
      imageUrl: attributes.image_url,
      createdAt: attributes.created_at,
      lastLogin: attributes.last_login,
      updatedAt: attributes.updated_at,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
  }
}

export interface User extends LuciaUser {
  // permissions: {
  //subject: 'generic_item' | 'advanced_item';
  //actions: { create?: 0 | 1; read: 0 | 1; update?: 0 | 1; delete?: 0 | 1 };
  // };
  role: Omit<DatabasePermission, 'user_id'>['role'];
}
export interface Account extends Omit<DatabaseAccount, 'provider_user_id'> {}

export interface Permission extends Omit<DatabasePermission, 'user_id'> {}

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);
