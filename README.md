# sveltekit-starter

A simple CRUD project using SvelteKit, Prisma, sqlite, Tailwind CSS, and TypeScript.

Clone this project:

```bash
git clone git@github.com:ronsen/sveltekit-starter.git
```

Or you can use `degit`:

```bash
npx degit ronsen/sveltekit-starter sveltekit-starter
```

Run these following commands to try locally:

```bash
cd sveltekit-starter
npm install
npm run dev
```

Migrate the database:

```bash
npx prisma migrate dev --name init
```

Database seeding:

```bash
npx prisma db seed
```

Create `/static/images` directory.

## Docker

Run these following commands to create a Docker container:

```bash
docker build --tag catatan:1.0 .
docker container create --name catatan -p 3000:3000 catatan:1.0
docker container start catatan
```