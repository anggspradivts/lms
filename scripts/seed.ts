const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Fitness" },
        { name: "Music" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Enginering" },
        { name: "Filming" },
      ]
    })
    console.log("Success qurying database category")
  } catch (error) {
    console.log("Error from seeding the database", error)
  } finally {
    await database.$disconnect();
  }
}

main();