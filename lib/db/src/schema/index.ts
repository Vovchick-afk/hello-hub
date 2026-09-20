import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const weaponsTable = pgTable("weapons", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: text("title").notNull(),
  family: text("family").notNull(),
  manufacturer: text("manufacturer").notNull(),
  country: text("country").notNull(),
  ammunition: text("ammunition").notNull(),
  kind: text("kind").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  principle: text("principle").notNull(),
  safetyNote: text("safety_note").notNull(),
  imageUrl: text("image_url"),
  yearFrom: integer("year_from"),
  yearTo: integer("year_to"),
  variantOfId: integer("variant_of_id"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const weaponImagesTable = pgTable("weapon_images", {
  id: serial("id").primaryKey(),
  weaponId: integer("weapon_id")
    .notNull()
    .references(() => weaponsTable.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  caption: text("caption").notNull(),
  sourceUrl: text("source_url"),
  sourceName: text("source_name").notNull(),
});

export const weaponResourcesTable = pgTable("weapon_resources", {
  id: serial("id").primaryKey(),
  weaponId: integer("weapon_id")
    .notNull()
    .references(() => weaponsTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  kind: varchar("kind", { length: 32 }).notNull(),
  description: text("description"),
  sourceName: text("source_name").notNull(),
});

export const commentsTable = pgTable("weapon_comments", {
  id: serial("id").primaryKey(),
  weaponId: integer("weapon_id")
    .notNull()
    .references(() => weaponsTable.id, { onDelete: "cascade" }),
  nickname: varchar("nickname", { length: 32 }).notNull(),
  body: varchar("body", { length: 1000 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("published"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});