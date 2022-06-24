
 CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"picture" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'	
);



CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"text" TEXT,
	"link" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'	
);



CREATE TABLE "hashtags" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'
);



CREATE TABLE "postHashtags" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"hashtagId" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'
);



CREATE TABLE "userLikes" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'
);



CREATE TABLE "follows" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"followId" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'	
);



CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"text" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'
);

