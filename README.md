# sveltekit-starter

A simple CRUD project using SvelteKit, Prisma, sqlite, Tailwind CSS, and TypeScript with many-to-many relationship example.

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

Sign in with a sample user:

```
Username: admin
Password: password
```