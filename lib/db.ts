import sqlite3 from 'better-sqlite3';

export const db = new sqlite3('main.db');

db.exec(`CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    name VARCHAR(255),
    email VARCHAR(100),
    email_verified INTEGER,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS oauth_account (
  provider_name TEXT NOT NULL,
  provider_user_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  PRIMARY KEY (provider_name, provider_user_id),
  FOREIGN KEY (user_id) REFERENCES user(id)
)`);

// db.exec(`CREATE TABLE IF NOT EXISTS email_verification_code (
//   id TEXT NOT NULL,
//   code TEXT NOT NULL,
//   user_id TEXT NOT NULL UNIQUE,
//   email VARCHAR(100) NOT NULL,
//   expires_at TIMESTAMP WITH TIMEZONE NOT NULL,
//   PRIMARY KEY (id, code)
// )`);

// db.exec(`CREATE TABLE IF NOT EXISTS permission (
//   subject TEXT NOT NULL,
//   actions JSONB NOT NULL,
//   conditions JSONB NOT NULL,
//   user_id TEXT NOT NULL,
//   PRIMARY KEY (subject, user_id),
//   FOREIGN KEY (user_id) REFERENCES user(id)
// )`);

db.exec(`CREATE TABLE IF NOT EXISTS permission (
  role TEXT NOT NULL,
  user_id TEXT NOT NULL,
  PRIMARY KEY (role, user_id),
  FOREIGN KEY (user_id) REFERENCES user(id)
)`);

/**A record (row) in the `user` table */
export interface DatabaseUser {
  /**An `internal` ID of a user */
  id: string;
  /**An `external` username (login on GitHub) of the user */
  username: string;
  name: string | null;
  email: string | null;
  email_verified: boolean;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
}

/**A record (row) in the `oauth_account` table */
export interface DatabaseAccount {
  /**Provider's name as lower-case. For example: `github`, `google`, etc */
  provider_name: string;
  /**An `external` ID of a user from a provider (`google` etc.) */
  provider_user_id: string;
  /**An `internal` ID of a user in the user table */
  user_id: string;
}

/**A record (row) in the `permission` table */
export interface DatabasePermission {
  /**The current role of the user */
  role: 'user' | 'admin';
  /**An `internal` ID of a user in the user table */
  user_id: string;
}
