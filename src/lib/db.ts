import { PrismaClient } from '@prisma/client';

// Función para crear una instancia de Prisma
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query']
  });
};

// Declaramos globalThis para mantener la instancia en desarrollo
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Usamos la instancia global si existe (evita múltiples conexiones en dev)
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// En desarrollo, asignamos la instancia a globalThis para evitar reconexiones
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
