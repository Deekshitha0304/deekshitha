import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { Pool } from 'pg';

let container: any;
let pool: Pool;
beforeAll(async () => {
  container = await new PostgreSqlContainer('postgres:15').start();

  pool = new Pool({
    host: container.getHost(),
    port: container.getPort(),
    user: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
  });

  await pool.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL
    )
  `);

  // seed users
  await pool.query(`
    INSERT INTO users (email, name)
    VALUES
    ('user1@test.com','User1'),
    ('user2@test.com','User2'),
    ('user3@test.com','User3')
  `);
});

afterAll(async () => {
  await pool.end();
  await container.stop();
});

async function createUser(email: string, name: string) {
  const result = await pool.query(
    'INSERT INTO users(email,name) VALUES($1,$2) RETURNING *',
    [email, name],
  );
  return result.rows[0];
}

async function getUserByEmail(email: string) {
  const result = await pool.query('SELECT * FROM users WHERE email=$1', [
    email,
  ]);
  return result.rows[0];
}

describe('User Repo', () => {
  it('creates a user', async () => {
    const user = await createUser('test@test.com', 'Deekshi');

    expect(user.email).toBe('test@test.com');
  });
});

it('finds user by email', async () => {
  await createUser('hello@test.com', 'Hello');

  const user = await getUserByEmail('hello@test.com');

  expect(user.email).toBe('hello@test.com');
});

it('throws error for duplicate email', async () => {
  await createUser('dup@test.com', 'User1');

  await expect(createUser('dup@test.com', 'User2')).rejects.toThrow();
});

import { afterEach } from 'vitest';

afterEach(async () => {
  await pool.query('TRUNCATE users RESTART IDENTITY');
});
