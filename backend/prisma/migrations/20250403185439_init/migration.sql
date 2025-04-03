-- CreateTable
CREATE TABLE "Profile" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Name" TEXT,
    "image" TEXT,
    "color" INTEGER,
    "ProfileSetup" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
