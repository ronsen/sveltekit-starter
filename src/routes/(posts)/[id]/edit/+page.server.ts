import type { Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { writeFileSync } from "fs";
import slugify from 'slugify';
import { db } from '$lib/server/database';
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
});

export const actions: Actions = {
    default: async ({ request, params }) => {
        const data = Object.fromEntries(await request.formData());

        const title = data.title as string;
        const content = data.content as string;
        const tagcsv = data.tagcsv as string;
        const file = data.file as File;

        if (title.length == 0) {
            return fail(400, {
                error: true,
                message: 'Field <strong>Title</strong> cannot be blank.'
            });
        }

        let filename = '';

        if (file) {
            const date = new Date().toISOString()
                .replaceAll('-', '')
                .replaceAll(':', '')
                .replace(/T/, '')
                .replace(/\..+/, '');

            filename = date + '-' + slugify(file.name.toLowerCase());

            writeFileSync(`static/images/${filename}`, Buffer.from(await file.arrayBuffer()));
        }

        const ids = await getTagIds(tagcsv);

        const post = await db.post.update({
            where: { id: Number(params.id) },
            data: {
                title: title.trim(),
                photo: filename,
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