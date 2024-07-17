/*
  Warnings:

  - You are about to drop the `Bedroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoricReservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvoiceDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Promotion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testimonial` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BookingsStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Bedroom" DROP CONSTRAINT "Bedroom_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_clientId_fkey";

-- DropForeignKey
ALTER TABLE "BookingDetail" DROP CONSTRAINT "BookingDetail_bedroomId_fkey";

-- DropForeignKey
ALTER TABLE "BookingDetail" DROP CONSTRAINT "BookingDetail_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "BookingDetail" DROP CONSTRAINT "BookingDetail_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "BookingService" DROP CONSTRAINT "BookingService_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "BookingService" DROP CONSTRAINT "BookingService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "HistoricReservation" DROP CONSTRAINT "HistoricReservation_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_invoiceId_fkey";

-- DropTable
DROP TABLE "Bedroom";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "BookingDetail";

-- DropTable
DROP TABLE "BookingService";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "HistoricReservation";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "InvoiceDetail";

-- DropTable
DROP TABLE "Promotion";

-- DropTable
DROP TABLE "Season";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "Testimonial";

-- DropEnum
DROP TYPE "BookingStatus";

-- CreateTable
CREATE TABLE "bedrooms" (
    "id" SERIAL NOT NULL,
    "typeBedroom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lowSeasonPrice" INTEGER NOT NULL,
    "highSeasonPrice" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "numberBedroom" INTEGER NOT NULL,
    "seasonsId" INTEGER NOT NULL,

    CONSTRAINT "bedrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "BookingsStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "boookingId" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "nameEvents" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hours" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "testimonials" TEXT NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicReservations" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "events" "EventStatus" NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historicReservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" SERIAL NOT NULL,
    "codePromotions" TEXT NOT NULL,
    "porcentageDescuent" INTEGER NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "nameService" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seasons" (
    "id" SERIAL NOT NULL,
    "nameSeason" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookingsServices" (
    "id" TEXT NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "servicesId" TEXT,

    CONSTRAINT "bookingsServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingsDetails" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "bedroomId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bookingsId" INTEGER NOT NULL,
    "bedroomsId" INTEGER NOT NULL,
    "promotionsId" INTEGER NOT NULL,

    CONSTRAINT "BookingsDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoce" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoceDetails" (
    "id" SERIAL NOT NULL,
    "invoceId" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "invoceDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bedrooms" ADD CONSTRAINT "bedrooms_seasonsId_fkey" FOREIGN KEY ("seasonsId") REFERENCES "Seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookingsServices" ADD CONSTRAINT "bookingsServices_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookingsServices" ADD CONSTRAINT "bookingsServices_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "Services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingsDetails" ADD CONSTRAINT "BookingsDetails_bookingsId_fkey" FOREIGN KEY ("bookingsId") REFERENCES "Bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingsDetails" ADD CONSTRAINT "BookingsDetails_bedroomsId_fkey" FOREIGN KEY ("bedroomsId") REFERENCES "bedrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingsDetails" ADD CONSTRAINT "BookingsDetails_promotionsId_fkey" FOREIGN KEY ("promotionsId") REFERENCES "promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoceDetails" ADD CONSTRAINT "invoceDetails_invoceId_fkey" FOREIGN KEY ("invoceId") REFERENCES "Invoce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
