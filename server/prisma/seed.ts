import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.users.upsert({
    where: { email: 'hatem@gmail.com' },
    update: {},
    create: {
        email: 'hatem@gmail.com',
        name: 'hatem',
        password: await bcrypt.hash("0000", 10),
        username: 'hatem'
      },
    })
}

main().then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
await prisma.$disconnect()
    process.exit(1)
})