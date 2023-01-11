import { PrismaClient } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
    const prisma = new PrismaClient();
    const note = await prisma.note.findUnique({
        where: {
            id: parseInt(params.id)
        },
    });

    await prisma.$disconnect();
    
    return { note };
}) satisfies PageServerLoad;
