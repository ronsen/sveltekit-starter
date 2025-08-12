import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/database';
import { hash } from '@node-rs/argon2';

export const actions = {
	default: async ({ request }) => {
		const { username, password } = Object.fromEntries(await request.formData()) as Record<string, string>;

		if (!username || !password) {
			return fail(400, {
				error: true,
				message: '<strong>Username</strong> and/or <strong>password</strong> can not be blank.'
			});
		}

		const user = await db.user.findUnique({
			where: { username: username.trim() }
		});

		if (user) {
			return fail(400, {
				error: true,
				message: '<strong>Username</strong> already exists.'
			});
		}

		const hashedPassword = await hash('password', {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		await db.user.create({
			data: {
				username: username.trim(),
				password: hashedPassword,
				token: crypto.randomUUID()
			}
		})

		redirect(303, '/login');
	}
} satisfies Actions;
