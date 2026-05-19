-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "carModel" TEXT,
    "problemDescription" TEXT,
    "preferredDate" TEXT,
    "preferredTime" TEXT,
    "contactMethod" TEXT NOT NULL,
    "comment" TEXT,
    "source" TEXT NOT NULL DEFAULT 'website',
    "userAgent" TEXT,
    "ipHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_serviceType_idx" ON "Lead"("serviceType");
