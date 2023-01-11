import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const prisma = new PrismaClient();
    const notes = await prisma.note.findMany({
        orderBy: [{ id: 'desc'}]
    });
    return { notes };
}) satisfies PageServerLoad;