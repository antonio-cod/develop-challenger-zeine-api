/*
  Warnings:

  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "filename" TEXT,
ADD COLUMN     "phone" DECIMAL(65,30) NOT NULL;
