import { db } from '$lib/database';
import slugify from 'slugify';

export const TagRepository = {
	async getIds(tagcsv: string) {
		const ids = [];

		if (tagcsv) {
			const tagNames = tagcsv.split(',');

			const tags = tagNames.map(async (tagName) => {
				const name = tagName.trim().toLowerCase();
				const slug = slugify(name);

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

			const resolved = await Promise.all(tags);

			for (const tag of resolved) {
				ids.push({ id: tag.id });
			}
		}

		return ids;
	},
}