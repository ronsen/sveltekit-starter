import { hash } from '@node-rs/argon2';
import { faker } from '@faker-js/faker';
import slugify from 'slugify';
import { db } from '../src/lib/database';

async function seed() {
	console.log('Starting database seeding...');

	// Clear existing data
	console.log('Cleaning up existing data...');
	await db.post.deleteMany();
	await db.tag.deleteMany();
	await db.user.deleteMany();

	// Hashing standard password for seeded users
	console.log('Hashing passwords...');
	const hashedPassword = await hash('password', {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	// Create Tags
	console.log('Creating tags...');
	const tagNames = ['Svelte', 'SvelteKit', 'TypeScript', 'Prisma', 'TailwindCSS', 'WebDev', 'JavaScript', 'Database'];
	const createdTags = [];

	for (const name of tagNames) {
		const tag = await db.tag.create({
			data: {
				name,
				slug: slugify(name, { lower: true, strict: true }),
			},
		});
		createdTags.push(tag);
	}

	// Create Admin User
	console.log('Creating admin user...');
	const adminUser = await db.user.create({
		data: {
			username: 'admin',
			password: hashedPassword,
			token: crypto.randomUUID(),
		},
	});

	// Create Regular Users
	console.log('Creating sample users...');
	const sampleUsers = [adminUser];

	for (let i = 0; i < 4; i++) {
		const user = await db.user.create({
			data: {
				username: faker.internet.username().toLowerCase(),
				password: hashedPassword,
				token: crypto.randomUUID(),
			},
		});
		sampleUsers.push(user);
	}

	// Create Posts
	console.log('Creating posts...');
	for (let i = 0; i < 15; i++) {
		const title = faker.lorem.sentence({ min: 3, max: 7 }).replace(/\.$/, '');
		const slug = slugify(title, { lower: true, strict: true }) + '-' + faker.string.alphanumeric(5);
		const randomAuthor = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];

		// Select 1 to 3 random tags
		const randomTags = faker.helpers.arrayElements(createdTags, { min: 1, max: 3 });

		await db.post.create({
			data: {
				title,
				slug,
				content: faker.lorem.paragraphs({ min: 2, max: 5 }),
				photo: faker.image.url(),
				authorId: randomAuthor.id,
				tags: {
					connect: randomTags.map((tag) => ({ id: tag.id })),
				},
			},
		});
	}

	console.log('Database seeding completed successfully!');
}

seed()
	.catch((e) => {
		console.error('Seeding failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
