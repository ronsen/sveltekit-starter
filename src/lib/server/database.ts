import { PrismaClient } from "@prisma/client";

const db = global.db || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
    global.db = db;
}

export { db };