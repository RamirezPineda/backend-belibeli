

<h1 align="center">Ecommerce BeliBeli (Backend)</h1>

<p align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/Node-20.12.x-green">
  <img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-5.4.x-blue">
  <img alt="Static Badge" src="https://img.shields.io/badge/pnpm-9.x-yellow">
  <img alt="Static Badge" src="https://img.shields.io/badge/Express-4.19.x-black">
  <img alt="Static Badge" src="https://img.shields.io/badge/Test-Vitest-yellow">
  <img alt="Static Badge" src="https://img.shields.io/badge/ESLint-4930bd">
</p>


## Description

An e-commerce project to sell products online.

## Previous requirements

**Node version >=20.12.0**

## Installation

1. Clone the repository

```bash
git clone https://github.com/RamirezPineda/backend-belibeli.git
```

2. Navigate to the application directory:

```bash
cd backend-belibeli
```
3. Install the project dependencies:

```bash
npm install
```

## Configuration

Rename the .env.example file to .env and set the environment variables

```bash
# before
|--src
|--tests
|--.env.example
...
...
...
|--vitest.config.ts

# after
|--src
|--tests
|--.env
...
...
...
|--vitest.config.ts
```
Run the database migration script

```bash
npm run db:migrate
```

## Running the app

```bash
# development
npm run dev

# production
npm run build
npm run start
```

## Test

```bash
# unit tests
npm run test

# test coverage
npm run test:coverage
```

## Linting

To run the linter you can execute:

```bash
npm run lint
```

And for trying to fix lint issues automatically, you can run: 

```bash
npm run lint:fix
```
