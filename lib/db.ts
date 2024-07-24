import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

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

/**A record (row) in the `generic_item` table */
export interface DatabaseGenericItem {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  is_private: boolean;
  images: string[] | null;
  /**Tags to describe the content */
  tags: string[] | null;
  website: string | null;
  created_at: Date;
  updated_at: Date;
  owner_id: string;
}

/**A record (row) in the `generic_item_comments` table */
export interface DatabaseGenericItemComments {
  id: string;
  title: string;
  content: string;
  item_id: string;
  created_at: Date;
  updated_at: Date;
  author_id: string;
}
