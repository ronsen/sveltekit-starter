import type { PageServerLoad } from './$types';
import { db } from '$lib/database';
import { redirect } from "@sveltejs/kit";
import { marked } from "marked";

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
			contentToHtml: await marked.parse(post.content!)
		}
	};
}) satisfies PageServerLoad;
