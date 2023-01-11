import type { PageServerLoad } from "./$types";
import { db } from '$lib/database';

export const load = (async ({ params }) => {
    const note = await db.note.findUnique({
        where: {
            id: Number(params.id)
        },
    });
    
    return { note };
}) satisfies PageServerLoad;
