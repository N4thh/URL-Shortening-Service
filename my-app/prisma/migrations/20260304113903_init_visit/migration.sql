/*
  Warnings:

  - You are about to drop the column `userAgent` on the `Visit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "userAgent",
ADD COLUMN     "browser" VARCHAR(50),
ADD COLUMN     "deviceType" VARCHAR(20),
ADD COLUMN     "os" VARCHAR(50);
