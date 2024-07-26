/*
  Warnings:

  - You are about to drop the `bedrooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookingsDetails" DROP CONSTRAINT "BookingsDetails_bedroomsId_fkey";

-- DropForeignKey
ALTER TABLE "bedrooms" DROP CONSTRAINT "bedrooms_seasonsId_fkey";

-- DropTable
DROP TABLE "bedrooms";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "events";

-- CreateTable
CREATE TABLE "Bedrooms" (
    "id" SERIAL NOT NULL,
    "typeBedroom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lowSeasonPrice" INTEGER NOT NULL,
    "highSeasonPrice" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "numberBedroom" INTEGER NOT NULL,
    "seasonsId" INTEGER NOT NULL,

    CONSTRAINT "Bedrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "boookingId" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "nameEvents" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hours" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bedrooms" ADD CONSTRAINT "Bedrooms_seasonsId_fkey" FOREIGN KEY ("seasonsId") REFERENCES "Seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingsDetails" ADD CONSTRAINT "BookingsDetails_bedroomsId_fkey" FOREIGN KEY ("bedroomsId") REFERENCES "Bedrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
