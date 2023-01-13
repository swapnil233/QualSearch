/*
  Warnings:

  - You are about to drop the column `name` on the `Speaker` table. All the data in the column will be lost.
  - You are about to drop the column `speakerId` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `interviewWith` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedById` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `_CriteriaToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToTranscript` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToVideo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[videoId]` on the table `Transcript` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `speakerName` to the `Speaker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `Speaker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criteriaId` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByUserId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcriptText` to the `Transcript` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT "Transcript_speakerId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "_CriteriaToTag" DROP CONSTRAINT "_CriteriaToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_CriteriaToTag" DROP CONSTRAINT "_CriteriaToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTranscript" DROP CONSTRAINT "_TagToTranscript_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTranscript" DROP CONSTRAINT "_TagToTranscript_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagToVideo" DROP CONSTRAINT "_TagToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToVideo" DROP CONSTRAINT "_TagToVideo_B_fkey";

-- DropIndex
DROP INDEX "Team_name_key";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Speaker" DROP COLUMN "name",
ADD COLUMN     "speakerName" TEXT NOT NULL,
ADD COLUMN     "videoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "criteriaId" INTEGER NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL,
ADD COLUMN     "transcriptId" INTEGER;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "createdByUserId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "speakerId",
DROP COLUMN "text",
ADD COLUMN     "transcriptText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "jobTitle",
DROP COLUMN "lastLogin",
DROP COLUMN "teamId",
ADD COLUMN     "middleName" TEXT,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "role" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "interviewWith",
DROP COLUMN "thumbnailUrl",
DROP COLUMN "title",
DROP COLUMN "uploadedById",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "_CriteriaToTag";

-- DropTable
DROP TABLE "_TagToTranscript";

-- DropTable
DROP TABLE "_TagToVideo";

-- CreateTable
CREATE TABLE "_TeamToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "_TeamToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToUser_B_index" ON "_TeamToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Transcript_videoId_key" ON "Transcript"("videoId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "Transcript"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
