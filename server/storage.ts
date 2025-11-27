import { 
  type User, 
  type InsertUser, 
  type Property, 
  type InsertProperty,
  type PropertyImage,
  type InsertPropertyImage,
  users,
  properties,
  propertyImages 
} from "@shared/schema";
import { db, pool } from "./db";
import { eq, and, desc, like, or } from "drizzle-orm";
import session from "express-session";
import type { Store } from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Property methods
  getProperty(id: number): Promise<(Property & { images: PropertyImage[] }) | undefined>;
  getProperties(filters?: { type?: string; category?: string; search?: string }): Promise<(Property & { images: PropertyImage[] })[]>;
  getUserProperties(userId: string): Promise<(Property & { images: PropertyImage[] })[]>;
  createProperty(userId: string, property: InsertProperty): Promise<Property>;
  updateProperty(id: number, userId: string, updates: Partial<Property>): Promise<Property | undefined>;
  deleteProperty(id: number, userId: string): Promise<boolean>;
  
  // Property Images methods
  addPropertyImages(propertyId: number, imageUrls: string[]): Promise<PropertyImage[]>;
  getPropertyImages(propertyId: number): Promise<PropertyImage[]>;
  
  sessionStore: Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Property methods
  async getProperty(id: number): Promise<(Property & { images: PropertyImage[] }) | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    if (!property) return undefined;
    
    const images = await this.getPropertyImages(id);
    return { ...property, images };
  }

  async getProperties(filters?: { type?: string; category?: string; search?: string }): Promise<(Property & { images: PropertyImage[] })[]> {
    let query = db.select().from(properties).where(eq(properties.status, "active"));
    
    const conditions = [eq(properties.status, "active")];
    
    if (filters?.type) {
      if (filters.type === 'farm') {
        conditions.push(eq(properties.category, 'farm'));
      } else {
        conditions.push(eq(properties.type, filters.type));
      }
    }
    
    if (filters?.category) {
      conditions.push(eq(properties.category, filters.category));
    }
    
    if (filters?.search) {
      conditions.push(
        or(
          like(properties.location, `%${filters.search}%`),
          like(properties.title, `%${filters.search}%`)
        )!
      );
    }
    
    const propertyList = await db
      .select()
      .from(properties)
      .where(and(...conditions))
      .orderBy(desc(properties.createdAt));
    
    const propertiesWithImages = await Promise.all(
      propertyList.map(async (property) => {
        const images = await this.getPropertyImages(property.id);
        return { ...property, images };
      })
    );
    
    return propertiesWithImages;
  }

  async getUserProperties(userId: string): Promise<(Property & { images: PropertyImage[] })[]> {
    const propertyList = await db
      .select()
      .from(properties)
      .where(eq(properties.userId, userId))
      .orderBy(desc(properties.createdAt));
    
    const propertiesWithImages = await Promise.all(
      propertyList.map(async (property) => {
        const images = await this.getPropertyImages(property.id);
        return { ...property, images };
      })
    );
    
    return propertiesWithImages;
  }

  async createProperty(userId: string, property: InsertProperty): Promise<Property> {
    const [newProperty] = await db
      .insert(properties)
      .values({ ...property, userId })
      .returning();
    return newProperty;
  }

  async updateProperty(id: number, userId: string, updates: Partial<Property>): Promise<Property | undefined> {
    const [property] = await db
      .update(properties)
      .set(updates)
      .where(and(eq(properties.id, id), eq(properties.userId, userId)))
      .returning();
    return property || undefined;
  }

  async deleteProperty(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(properties)
      .where(and(eq(properties.id, id), eq(properties.userId, userId)))
      .returning();
    return result.length > 0;
  }

  // Property Images methods
  async addPropertyImages(propertyId: number, imageUrls: string[]): Promise<PropertyImage[]> {
    if (imageUrls.length === 0) return [];
    
    const imagesToInsert = imageUrls.map((url, index) => ({
      propertyId,
      imageUrl: url,
      order: index,
    }));
    
    const images = await db
      .insert(propertyImages)
      .values(imagesToInsert)
      .returning();
    
    return images;
  }

  async getPropertyImages(propertyId: number): Promise<PropertyImage[]> {
    const images = await db
      .select()
      .from(propertyImages)
      .where(eq(propertyImages.propertyId, propertyId))
      .orderBy(propertyImages.order);
    
    return images;
  }
}

export const storage = new DatabaseStorage();
