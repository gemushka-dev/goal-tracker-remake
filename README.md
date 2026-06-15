# Goal Tracker API

A simple backend for managing goals, comments, and likes. Built with **NestJS** and **PostgreSQL**.

## Tech Stack

- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Drizzle
- **Package Manager:** pnpm

## Features

- User registration and authentication

- CRUD goals

- Comment on goals and reply to comments

- Fully RESTful API

## Setup

### 1. Clone & Install

```bash
pnpm install
```

### 2. Environment Variables

Create a `.env` file in the root directory and add your database credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
JWT_SECRET="your_jwt_secret_key"
PORT=3000
```

### 3. Database Migration

```bash
pnpm db:generate

pnpm db:migrate
```

### 4. Run the Application

```bash
pnpm start:dev
```
