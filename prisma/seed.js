import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import bcrypt  from 'bcrypt';

const prisma = new PrismaClient();

async function addUsers() {
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('password', 10),
            token: crypto.randomUUID()
        }
    });
}

async function addPosts() {
    await prisma.post.deleteMany();
    
    for (let i = 0; i < 20; i++) {
        const words = faker.random.words(5).split(' ');
        const title = words.map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");

        const slug = slugify(title.toLowerCase());
        const content = faker.lorem.paragraphs(3, '\n\n');
     
        const post = await prisma.post.create({
            data: { title, slug, content, authorId: user.id }
        });
    }
}

async function main() {
    await addUsers();
    await addPosts();
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