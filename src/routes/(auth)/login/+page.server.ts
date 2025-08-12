import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/database';
import { verify } from '@node-rs/argon2';

export const actions = {
	default: async ({ cookies, request }) => {
		const { username, password } = Object.fromEntries(await request.formData()) as Record<string, string>;

		if (!username || !password) {
			return fail(400, {
				error: true,
				message: '<strong>Username</strong> and/or <strong>password</strong> can not be blank.'
			});
		}

		let user = await db.user.findUnique({
			where: { username: username.trim() }
		});

		if (!user) {
			return fail(400, {
				error: true,
				message: 'User not exists.'
			});
		} else {
			const validPassword = await verify(user.password, password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1,
			});

			if (!validPassword) {
				return fail(400, {
					error: true,
					message: 'You have entered invalid credentials.'
				});
			}
		}

		if (!user.token) {
			user = await db.user.update({
				where: { username: user?.username },
				data: { token: crypto.randomUUID() }
			});
		}

		cookies.set('session', String(user.token), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30
		});

		redirect(302, '/');
	}
} satisfies Actions;
