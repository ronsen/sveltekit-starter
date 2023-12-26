import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load = (async ({ params, url }) => {
    const page = Number(url.searchParams.get('page') ?? '1');

    const tag = await db.tag.findFirst({
        where: { slug: params.slug }
    });

    const posts = await db.post.findMany({
        take: 10,
        skip: page == 1 ? 0 : (page - 1) * 10,
        orderBy: [{ id: 'desc'}],
        where: {
            tags: {
                some: {
                    slug: tag?.slug
                }
            }
        }
    });

    const prevPage = page == 1 ? 0 : page - 1;
    const nextPage = posts.length < 10 ? 0 : page + 1;

    return { tag, posts, prevPage, nextPage };
}) satisfies PageServerLoad;