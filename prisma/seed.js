import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
    await prisma.note.deleteMany();

    for (let i = 0; i < 50; i++) {
        const words = faker.random.words(5).split(' ');

        const title = words.map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");

        const slug = slugify(title.toLowerCase());

        const content = faker.lorem.paragraphs(3, '\n\n');
     
        const note = await prisma.note.create({
            data: {
                title,
                slug,
                content
            }
        });

        console.info(note.title);
    }
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