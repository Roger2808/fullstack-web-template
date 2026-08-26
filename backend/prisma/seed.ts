import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_CLINIC_ID = '00000000-0000-0000-0000-000000000001';
const DEMO_ADMIN_EMAIL = 'admin@medicore.demo';
const DEMO_ADMIN_PASSWORD = 'Demo1234!';

async function main() {
  const passwordHash = await bcrypt.hash(DEMO_ADMIN_PASSWORD, 10);

  await prisma.user.upsert({
    where: { email: DEMO_ADMIN_EMAIL },
    update: {},
    create: {
      clinicId: DEMO_CLINIC_ID,
      email: DEMO_ADMIN_EMAIL,
      passwordHash,
      fullName: 'Administrador MediCore',
      role: 'ADMIN',
      active: true,
    },
  });

  console.log('Usuario de demostración listo:');
  console.log(`  Correo:     ${DEMO_ADMIN_EMAIL}`);
  console.log(`  Contraseña: ${DEMO_ADMIN_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
