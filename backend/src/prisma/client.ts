import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    user: "postgres",
    connectionString: process.env.DATABASE_URL!,
    password: "password",
    port: 5432,
    database: "postgres",
});

const prisma = new PrismaClient({ adapter });


export default prisma;