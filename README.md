# Odoo API

Odoo JSON RPC client that should works for both Node.js and Browser, it depends only on `axios` for http request and `dotenv` to store account params.

## Features:
- Fully typed with TypeScript
- Easy to use
- Can be extended with modules
- Fast with Vite & Vitest.

## How to use?

1- Create `.env` from `.env.example`:
```bash
cp .env.example .env
```
2- Set account params in `.env` file (username, password...).

3- Install depedencies:
```bash
npm install
```

4- Run unit tests:
```bash
npm run test
```

## Usage examples:
Create a partner:
```