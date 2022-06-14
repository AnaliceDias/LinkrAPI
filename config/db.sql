CREATE TABLE users (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"picture" TEXT NOT NULL
);

CREATE TABLE posts (
	"id" SERIAL PRIMARY KEY,
	"text" TEXT,
	"link" TEXT NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "userLikes" (
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"postId" INTEGER NOT NULL REFERENCES "posts"("id")
);

CREATE TABLE hashtags (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT UNIQUE NOT NULL
);

CREATE TABLE "postHashtags" (
	"id" SERIAL PRIMARY KEY,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
	"hashtagId" INTEGER NOT NULL REFERENCES "hashtags"("id")
);
