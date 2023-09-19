-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "characterName" VARCHAR(100) NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
