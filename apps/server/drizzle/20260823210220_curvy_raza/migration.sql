CREATE TABLE "collector" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"urls" jsonb,
	"status" text NOT NULL,
	"created_at" timestamp(6) with time zone NOT NULL,
	"updated_at" timestamp(6) with time zone NOT NULL
);
