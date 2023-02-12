import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import slugify from 'slugify';
import { getTagIds } from "$lib/server/services";

export const load = (async ({ locals, params }) => {
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

    return {
        post: {
            ...post,
            tagcsv: post.tags.map((tag, i) => i == 0 ? tag.name : ' ' + tag.name)
        }
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, params }) => {
        const { title, content, tagcsv } = Object.fromEntries(await request.formData()) as Record<string, string>;

        if (title.length == 0) {
            return fail(400, {
                error: true,
                message: 'Field <strong>Title</strong> cannot be blank.'
            });
        }

        const ids = await getTagIds(tagcsv);

        const post = await db.post.update({
            where: { id: Number(params.id) },
            data: {
                title: title.trim(),
                slug: slugify(title.toLowerCase()),
                content: content.trim(),
                tags: {
                    set: [...ids]
                }
            }
        });

        throw redirect(302, `/${post.id}/${post.slug}`);
    }
};