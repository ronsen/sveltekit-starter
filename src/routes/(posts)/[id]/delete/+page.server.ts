import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db } from '$lib/database';
import type { Post } from "$lib/../generated/prisma/client";

export const actions = {
	default: async ({ locals, params }) => {
		const post = await db.post.findFirst({
			where: {
				id: Number(params.id)
			},
		}) as Post | null;

		if (!post && locals.user!.id == post!.authorId) {
			throw redirect(302, '/');
		}

		await db.post.delete({
			where: {
				id: post?.id
			}
		});

		throw redirect(302, '/');
	}
} satisfies Actions;
