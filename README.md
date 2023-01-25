# sveltekit-starter

A simple CRUD project using SvelteKit, Prisma, sqlite, Tailwind CSS, and TypeScript.

Clone this project and run these following commands to try locally:

```bash
npm install
npm run dev
```

Migrate database:

```bash
npx prisma migrate dev --name init
```

Database seeding:

```bash
npx prisma db seed
```

## Docker

Run these following commands to create a Docker container:

```bash
docker build --tag catatan:1.0 .
docker container create --name catatan -p 3000:3000 catatan:1.0
docker container start catatan
```