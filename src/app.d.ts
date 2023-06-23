// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import { PrismaClient } from "@prisma/client";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number,
				name: string
			}
		}
		// interface PageData {}
		// interface Platform {}
	}

	var db: PrismaClient;
}

export {};