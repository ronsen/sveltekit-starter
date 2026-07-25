# sveltekit-starter

A simple CRUD project using SvelteKit, Prisma, sqlite, Tailwind CSS, and TypeScript with many-to-many relationship example.

Clone this project:

```bash
git clone git@github.com:ronsen/sveltekit-starter.git
```

Run these following commands to try locally:

```bash
cd sveltekit-starter
npm install
npm run dev
```

Migrate the database:

```bash
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate
```

To build this project, be sure to run `npx prisma generate` first then:

```bash
npm run build
```

Create `/static/images` directory.
