import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { db } from '$lib/server/database';

export const load = (async ({ locals, params }) => {
    if (!locals.user) {
        throw redirect(302, '/login');
    }
    
    const post = await db.post.findFirst({
        where: {
            AND: [
                { author: { id: locals.user.id } },
                { id: Number(params.id) },
            ]
        },
    });
    
    return { post };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ params }) => {
        await db.post.delete({
            where: {
                id: Number(params.id)
            }
        });

        throw redirect(302, '/');
    }
};