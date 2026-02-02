import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = await prisma.category.findMany({
        where: { slug: '' }
    });

    for (const cat of categories) {
        const newSlug = cat.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || `id-${cat.id.slice(0, 8)}`;
        await prisma.category.update({
            where: { id: cat.id },
            data: { slug: newSlug }
        });
        console.log(`Updated category ${cat.name} with new slug: ${newSlug}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
