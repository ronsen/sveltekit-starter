import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import crypto from "crypto";

const prisma = new PrismaClient();

async function addUser() {
    let user = await prisma.user.findUnique({
        where: {
            username: 'admin'
        }
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                username: 'admin',
                password: crypto.createHash('sha256').update('password').digest('hex'),
                token: crypto.randomUUID()
            }
        });
    }

    return user;
}

async function addPosts(user) {
    const tags = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    const posts = [];

    for (let i = 0; i < 20; i++) {
        const words = faker.lorem.words(5).split(' ');
        const title = words.map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");

        const slug = slugify(title.toLowerCase());
        const content = faker.lorem.paragraphs(3, '\n\n');

        const post = await prisma.post.create({
            data: {
                title, slug, content, authorId: user.id,
                tags: {
                    connectOrCreate: tags.map((name) => {
                        return {
                            where: { slug: name },
                            create: {
                                name,
                                slug: name
                            }
                        }
                    })
                }
            }
        });

        posts.push(post);
    }

    return posts;
}

async function main() {
    const user = await addUser();
    await addPosts(user);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })