-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_votes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "votedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pollId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "votes_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "poll_options" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "votes_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_votes" ("id", "optionId", "pollId", "userId", "votedAt") SELECT "id", "optionId", "pollId", "userId", "votedAt" FROM "votes";
DROP TABLE "votes";
ALTER TABLE "new_votes" RENAME TO "votes";
CREATE UNIQUE INDEX "votes_userId_pollId_key" ON "votes"("userId", "pollId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
