import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function migrarPasswords() {
  try {
    const usuarios = await prisma.usuario.findMany();

    for (const user of usuarios) {
      const esHash = user.password.startsWith('$2b$') || user.password.startsWith('$2a$');
      if (!esHash) {
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
        await prisma.usuario.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        });
        console.log(`Contraseña hasheada para usuario: ${user.email}`);
      } else {
        console.log(`Contraseña ya hasheada para usuario: ${user.email}`);
      }
    }

    console.log('Migración completa.');
  } catch (error) {
    console.error('Error al migrar contraseñas:', error);
    console.log(error.message)
  } finally {
    await prisma.$disconnect();
  }
}

migrarPasswords();
