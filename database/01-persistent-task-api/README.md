# Persistent Task Notes API

Node.js + TypeScript REST API with PostgreSQL persistence.

## Setup

Install dependencies

pnpm install

Create database

createdb taskapp_dev

Run migrations

psql taskapp_dev -f scripts/setup-db.sql

Create .env

Run server

pnpm dev