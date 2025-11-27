import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, serial, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  avatarUrl: text("avatar_url"),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  subtype: text("subtype"),
  location: text("location").notNull(),
  coordinatesLat: decimal("coordinates_lat", { precision: 10, scale: 8 }).notNull(),
  coordinatesLng: decimal("coordinates_lng", { precision: 11, scale: 8 }).notNull(),
  area: integer("area").notNull(),
  bedrooms: integer("bedrooms"),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  featured: boolean("featured").default(false),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const propertyImages = pgTable("property_images", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => properties.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull().default(0),
});

export const usersRelations = relations(users, ({ many }) => ({
  properties: many(properties),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  user: one(users, {
    fields: [properties.userId],
    references: [users.id],
  }),
  images: many(propertyImages),
}));

export const propertyImagesRelations = relations(propertyImages, ({ one }) => ({
  property: one(properties, {
    fields: [propertyImages.propertyId],
    references: [properties.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  role: true,
}).extend({
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
  userId: true,
}).extend({
  coordinatesLat: z.string(),
  coordinatesLng: z.string(),
});

export const insertPropertyImageSchema = createInsertSchema(propertyImages).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type PropertyImage = typeof propertyImages.$inferSelect;
export type InsertPropertyImage = z.infer<typeof insertPropertyImageSchema>;
