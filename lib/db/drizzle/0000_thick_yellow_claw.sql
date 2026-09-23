CREATE TABLE "weapon_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"weapon_id" integer NOT NULL,
	"nickname" varchar(32) NOT NULL,
	"body" varchar(1000) NOT NULL,
	"status" varchar(20) DEFAULT 'published' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weapon_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"weapon_id" integer NOT NULL,
	"url" text NOT NULL,
	"alt" text NOT NULL,
	"caption" text NOT NULL,
	"source_url" text,
	"source_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weapon_resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"weapon_id" integer NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"kind" varchar(32) NOT NULL,
	"description" text,
	"source_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weapons" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(160) NOT NULL,
	"title" text NOT NULL,
	"family" text NOT NULL,
	"manufacturer" text NOT NULL,
	"country" text NOT NULL,
	"ammunition" text NOT NULL,
	"kind" text NOT NULL,
	"summary" text NOT NULL,
	"description" text NOT NULL,
	"principle" text NOT NULL,
	"safety_note" text NOT NULL,
	"image_url" text,
	"year_from" integer,
	"year_to" integer,
	"variant_of_id" integer,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "weapons_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "weapon_comments" ADD CONSTRAINT "weapon_comments_weapon_id_weapons_id_fk" FOREIGN KEY ("weapon_id") REFERENCES "public"."weapons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weapon_images" ADD CONSTRAINT "weapon_images_weapon_id_weapons_id_fk" FOREIGN KEY ("weapon_id") REFERENCES "public"."weapons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weapon_resources" ADD CONSTRAINT "weapon_resources_weapon_id_weapons_id_fk" FOREIGN KEY ("weapon_id") REFERENCES "public"."weapons"("id") ON DELETE cascade ON UPDATE no action;