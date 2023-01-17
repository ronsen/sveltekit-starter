import type { PageServerLoad } from "./$types";
import { db } from '$lib/database';
import { redirect } from "@sveltejs/kit";

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

    if (!post) {
        throw redirect(302, '/');
    }

    const newPost = {
        ...post,
        contentToHtml: post?.content?.replace(/(?:\r\n|\r|\n)/g, "<br>")
    };

    return { post: newPost };
}) satisfies PageServerLoad;
