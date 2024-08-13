-- Si necesitas conservar datos, primero exporta los datos de UserRole

-- Agregar la columna roleId como nullable
ALTER TABLE "User" ADD COLUMN "roleId" INTEGER;

-- Actualizar los registros existentes
UPDATE "User" SET "roleId" = 1; -- Cambia 1 por un valor que tenga sentido

-- Cambiar la columna a NOT NULL
ALTER TABLE "User" ALTER COLUMN "roleId" SET NOT NULL;

-- Eliminar la tabla UserRole
DROP TABLE "UserRole";

-- Agregar la clave foránea
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;