import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';
import { redirect } from "@sveltejs/kit";
import { marked } from "marked";

export const load = (async ({ locals, params }) => {
    if (!locals.user) {
        redirect(302, '/login');
    }

    const post = await db.post.findFirst({
        where: {
            AND: [
                { author: { id: locals.user.id } },
                { id: Number(params.id) },
            ]
        },
        include: { tags: true }
    });

    if (!post) {
        redirect(302, '/');
    }

    return {
        post: {
            ...post,
            contentToHtml: marked.parse(post?.content as string)
        }
    };
}) satisfies PageServerLoad;
