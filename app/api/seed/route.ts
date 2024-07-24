import { NeonDbError } from '@neondatabase/serverless';
import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@/lib/db';

async function users() {
  noStore();
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username TEXT NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      email_verified BOOLEAN,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP WITH TIME ZONE
    )`;
    console.log(`🌱 Your database has been seeded with ${0} users`);
  } catch (error) {
    const err =
      error instanceof NeonDbError
        ? { name: error.name, message: error.message }
        : { name: 'Internal Server Error', message: 'Something went wrong' };
    console.error(`${err.name} in users: ${err.message}`);
    throw error;
  }
}

async function genericItems() {
  noStore();
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`CREATE TABLE IF NOT EXISTS generic_items (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      is_published BOOLEAN NOT NULL,
      is_private BOOLEAN NOT NULL,
      images JSONB NOT NULL,
      tags JSONB NOT NULL,
      website VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      owner_id UUID NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    )`;
    console.log(`🌱 Your database has been seeded with ${0} items`);
  } catch (error) {
    const err =
      error instanceof NeonDbError
        ? { name: error.name, message: error.message }
        : { name: 'Internal Server Error', message: 'Something went wrong' };
    console.error(`${err.name} in genericItems: ${err.message}`);
    throw error;
  }
}

// async function verificationTokens() {
//   try {
//     await sql`
//     CREATE TABLE IF NOT EXISTS verification_token (
//       identifier TEXT NOT NULL,
//       expires TIMESTAMP WITH TIME ZONE NOT NULL,
//       token TEXT NOT NULL,
//       PRIMARY KEY (identifier, token)
//     );
//   `;
//   } catch (error) {
//     console.error('Error in verificationTokens:', error);
//     throw error;
//   }
// }

async function oAuthAccounts() {
  noStore();
  try {
    await sql`CREATE TABLE IF NOT EXISTS oauth_accounts (
      provider_name TEXT NOT NULL,
      provider_user_id TEXT NOT NULL,
      user_id UUID NOT NULL,
      PRIMARY KEY (provider_name, provider_user_id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;
    console.log(`🌱 Your database has been seeded with ${0} accounts`);
  } catch (error) {
    const err =
      error instanceof NeonDbError
        ? { name: error.name, message: error.message }
        : { name: 'Internal Server Error', message: 'Something went wrong' };
    console.error(`${err.name} in oAuthAccounts: ${err.message}`);
    throw error;
  }
}

async function sessions() {
  noStore();
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
      user_id UUID NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;
    console.log(`🌱 Your database has been seeded with ${0} sessions`);
  } catch (error) {
    const err =
      error instanceof NeonDbError
        ? { name: error.name, message: error.message }
        : { name: 'Internal Server Error', message: 'Something went wrong' };
    console.error(`${err.name} in sessions: ${err.message}`);
    throw error;
  }
}

async function permissions() {
  noStore();
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`CREATE TABLE IF NOT EXISTS permissions (
      role VARCHAR(100) NOT NULL,
      user_id UUID NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;
    console.log(`🌱 Your database has been seeded with ${0} permissions`);
  } catch (error) {
    const err =
      error instanceof NeonDbError
        ? { name: error.name, message: error.message }
        : { name: 'Internal Server Error', message: 'Something went wrong' };
    console.error(`${err.name} in sessions: ${err.message}`);
    throw error;
  }
}

export async function GET() {
  noStore();
  try {
    await users();
    await genericItems();
    await oAuthAccounts();
    await sessions();
    await permissions();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
