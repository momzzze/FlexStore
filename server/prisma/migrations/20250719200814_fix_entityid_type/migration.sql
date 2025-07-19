/*
  Warnings:

  - The `entityId` column on the `ActivityLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "entityId",
ADD COLUMN     "entityId" INTEGER;
