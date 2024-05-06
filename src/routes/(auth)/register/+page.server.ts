import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/database';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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

		await db.user.create({
			data: {
				username: username.trim(),
				password: await bcrypt.hash(password, 10),
				token: crypto.randomUUID()
			}
		})

		redirect(303, '/login');
	}
} satisfies Actions;