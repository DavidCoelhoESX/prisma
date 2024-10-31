-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "people_email_key" ON "people"("email");
