-- CreateTable
CREATE TABLE "Skin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weapon" TEXT NOT NULL,
    "wear" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "priceChange" REAL NOT NULL,
    "float" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "marketHashName" TEXT NOT NULL,
    "volume" INTEGER NOT NULL DEFAULT 0,
    "trending" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "skinId" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "volume" INTEGER NOT NULL DEFAULT 0,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PriceHistory_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "skinId" TEXT NOT NULL,
    "predictedPrice" REAL NOT NULL,
    "confidence" REAL NOT NULL,
    "signal" TEXT NOT NULL,
    "velocity" TEXT NOT NULL,
    "targetDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Prediction_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Skin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Watchlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "skinName" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Skin_marketHashName_key" ON "Skin"("marketHashName");

-- CreateIndex
CREATE INDEX "Skin_trending_idx" ON "Skin"("trending");

-- CreateIndex
CREATE INDEX "Skin_featured_idx" ON "Skin"("featured");

-- CreateIndex
CREATE INDEX "Skin_price_idx" ON "Skin"("price");

-- CreateIndex
CREATE INDEX "PriceHistory_skinId_timestamp_idx" ON "PriceHistory"("skinId", "timestamp");

-- CreateIndex
CREATE INDEX "Prediction_skinId_idx" ON "Prediction"("skinId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Watchlist_userId_idx" ON "Watchlist"("userId");
