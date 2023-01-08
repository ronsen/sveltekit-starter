# sveltekit-prisma-crud

A simple CRUD project using SvelteKit, Prisma, sqlite, and TypeScript.

Run these following commands to try this project:

```bash
npm install
npm run dev
```

Migrate database:

```bash
npx prisma migrate dev --name init
```

## Docker

Run these following command to create a Docker container:

```bash
docker build --tag catatan:1.0 .
docker container create --name catatan -p 3000:3000 catatan:1.0
docker container start catatan
```