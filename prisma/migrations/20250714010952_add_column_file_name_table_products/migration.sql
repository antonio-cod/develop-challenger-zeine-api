/*
  Warnings:

  - Added the required column `filename` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "filename" TEXT NOT NULL;
