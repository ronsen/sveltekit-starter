import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate';

const db = new PrismaClient().$extends(withAccelerate());

export { db };
