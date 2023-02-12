import { db } from '$lib/server/database';
import slugify from 'slugify';

export const getTagIds = async (tagcsv: string) => {
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

    return ids;
}