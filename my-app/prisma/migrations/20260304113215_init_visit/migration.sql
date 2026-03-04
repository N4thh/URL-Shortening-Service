-- CreateTable
CREATE TABLE "Visit" (
    "id" BIGSERIAL NOT NULL,
    "urlId" BIGINT NOT NULL,
    "deviceId" VARCHAR(100),
    "ip" VARCHAR(45),
    "country" VARCHAR(5),
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "URLS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
