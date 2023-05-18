import { db } from '$lib/server/database';
import { redirect } from "@sveltejs/kit";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";

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
        include: { tags: true }
    });

    if (!post) {
        throw redirect(302, '/');
    }

    const options = {
        prefix: "",
    };

    marked.use(mangle());
    marked.use(gfmHeadingId(options));

    return {
        post: {
            ...post,
            contentToHtml: marked.parse((post?.content as string).replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,""))
        }
    };
});
