import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import multer from "multer";
import { insertPropertySchema } from "@shared/schema";
import { avatarStorage, propertyStorage } from "./cloudinary";

// Configure multer with Cloudinary storage
const uploadAvatar = multer({ 
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const uploadPropertyImages = multer({ 
  storage: propertyStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup authentication routes: /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // === USER ROUTES ===
  
  // Update user profile
  app.patch("/api/user", isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const { name, phone } = req.body;
      
      const updatedUser = await storage.updateUser(userId, { name, phone });
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
      
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  });

  // Upload avatar
  app.post("/api/user/avatar", isAuthenticated, uploadAvatar.single('avatar'), async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }
      
      const userId = req.user!.id;
      // Cloudinary returns the URL in req.file.path
      const avatarUrl = (req.file as any).path;
      
      const updatedUser = await storage.updateUser(userId, { avatarUrl });
      res.json({ avatarUrl: updatedUser?.avatarUrl });
    } catch (error) {
      next(error);
    }
  });

  // === PROPERTY ROUTES ===
  
  // Get all properties with optional filters
  app.get("/api/properties", async (req, res, next) => {
    try {
      const { type, category, search } = req.query;
      const properties = await storage.getProperties({
        type: type as string,
        category: category as string,
        search: search as string,
      });
      res.json(properties);
    } catch (error) {
      next(error);
    }
  });

  // Get single property by ID
  app.get("/api/properties/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).send("Property not found");
      }
      
      res.json(property);
    } catch (error) {
      next(error);
    }
  });

  // Get user's properties
  app.get("/api/user/properties", isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const properties = await storage.getUserProperties(userId);
      res.json(properties);
    } catch (error) {
      next(error);
    }
  });

  // Create new property
  app.post("/api/properties", isAuthenticated, uploadPropertyImages.array('images', 10), async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const propertyData = JSON.parse(req.body.propertyData);
      
      // Validate property data
      const validatedData = insertPropertySchema.parse(propertyData);
      
      // Create property
      const property = await storage.createProperty(userId, validatedData);
      
      // Add images if uploaded (Cloudinary returns URLs in file.path)
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const imageUrls = req.files.map((file: any) => file.path);
        await storage.addPropertyImages(property.id, imageUrls);
      }
      
      // Return property with images
      const propertyWithImages = await storage.getProperty(property.id);
      res.status(201).json(propertyWithImages);
    } catch (error) {
      next(error);
    }
  });

  // Update property
  app.patch("/api/properties/:id", isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const id = parseInt(req.params.id);
      
      const updatedProperty = await storage.updateProperty(id, userId, req.body);
      
      if (!updatedProperty) {
        return res.status(404).send("Property not found or unauthorized");
      }
      
      res.json(updatedProperty);
    } catch (error) {
      next(error);
    }
  });

  // Delete property
  app.delete("/api/properties/:id", isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const id = parseInt(req.params.id);
      
      const deleted = await storage.deleteProperty(id, userId);
      
      if (!deleted) {
        return res.status(404).send("Property not found or unauthorized");
      }
      
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  return httpServer;
}
