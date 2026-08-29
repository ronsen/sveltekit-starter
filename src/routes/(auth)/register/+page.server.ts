import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/database';
import { hash } from 'bcrypt';

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

		const hashedPassword = await hash(password, 12);

		await db.user.create({
			data: {
				username: username.trim(),
				password: hashedPassword,
				token: crypto.randomUUID()
			}
		})

		throw redirect(303, '/login');
	}
} satisfies Actions;
