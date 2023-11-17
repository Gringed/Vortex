import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // loop for 10 times
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = {
      username: faker.internet.userName(),
      image: faker.image.avatar(),
      name: faker.person.firstName(),
      bio: faker.lorem.paragraph(),
      link: faker.internet.url(),
      email: faker.internet.email(),
    } as const;

    // eslint-disable-next-line no-await-in-loop
    const dbUser = await prisma.users.create({
      data: user,
    });

    users.push(dbUser);
  }
  const posts = [];
  for (let i = 0; i < 100; i++) {
    const randomUserIndex = faker.number.int({
      min: 0,
      max: users.length - 1,
    });

    const randomWorldCount = faker.number.int({
      min: 5,
      max: 12,
    });
    const post = {
      title: faker.lorem.sentence(20),
      content: faker.lorem.sentence(randomWorldCount),
      userId: users[randomUserIndex].id,
    };

    // eslint-disable-next-line no-await-in-loop
    const dbPost = await prisma.post.create({
      data: post,
    });

    posts.push(dbPost);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
