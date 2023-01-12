import type { PageServerLoad } from "./$types";
import { db } from '$lib/database';
import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    const note = await db.note.findFirst({
        where: {
            AND: [
                { authorId: locals.user.id },
                { id: Number(params.id) },
            ]
        },
    });
    
    return { note };
}) satisfies PageServerLoad;
