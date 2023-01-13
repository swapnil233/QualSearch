/*
  Warnings:

  - You are about to drop the column `speakerName` on the `Speaker` table. All the data in the column will be lost.
  - Added the required column `name` to the `Speaker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Speaker" DROP COLUMN "speakerName",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "organization" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayPic" TEXT;
