-- CreateTable
CREATE TABLE "URLS" (
    "id" BIGSERIAL NOT NULL,
    "short_url" VARCHAR(10) NOT NULL,
    "original_url" TEXT NOT NULL,
    "expired_At" TIMESTAMPTZ,
    "created_At" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "URLS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URLS_short_url_key" ON "URLS"("short_url");

-- CreateIndex
CREATE UNIQUE INDEX "URLS_original_url_key" ON "URLS"("original_url");
