-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('sale');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'sale';
