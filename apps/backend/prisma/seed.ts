// src/prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:
  //
  //   const existing = await prisma.user.findUnique({ where: { email: 'admin@example.com' }})
  //   if (!existing) {
  //      await prisma.user.create({ data: { name: 'Admin', email: 'admin@example.com' }})
  //   }

  // create development tenant
  await prisma.tenant.upsert({
    where: {
      id: '12345678-1234-1234-1234-123456789012',
    },
    update: {},
    create: {
      id: '12345678-1234-1234-1234-123456789012',
      name: 'Development Tenant',
    },
  });

  //create roles
  const roles = ['admin', 'manager', 'field-worker', 'viewer', 'guest'];
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: {
        name: role,
      },
    });
  }
  console.log('✅ Seeded successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
