import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import slugify from 'slugify';

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

    const tagcsv = post.tags.map((tag, i) => {
        if (i == 0) {
            return tag.name;
        }

        return ' ' + tag.name;
    })

    return {
        post: {
            ...post,
            tagcsv
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

        const ids = [];

        if (tagcsv) {
            const tagNames = tagcsv.split(',');

            const tags = tagNames.map(async (tagName) => {
                const name = tagName.trim().toLowerCase();
                const slug = slugify(tagName);

                let tag = await db.tag.findFirst({
                    where: { slug: slug }
                });

                if (!tag) {
                    tag = await db.tag.create({
                        data: { name, slug }
                    });
                }

                return tag;
            });

            let i = 0;
            for (const tag of tags) {
                ids[i++] = { id: (await tag)?.id }
            }
        }

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