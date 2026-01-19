/*
  Warnings:

  - A unique constraint covering the columns `[contact]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Contact_contact_key` ON `Contact`(`contact`);
