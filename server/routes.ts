import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import multer from "multer";
import { insertPropertySchema } from "@shared/schema";
import { avatarStorage, propertyStorage } from "./cloudinary";
import { chatWithBhoomi } from "./bhoomi";

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
      
      // Parse property data
      let propertyData;
      try {
        propertyData = JSON.parse(req.body.propertyData);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return res.status(400).json({ error: 'Invalid property data format' });
      }
      
      // Validate property data
      let validatedData;
      try {
        validatedData = insertPropertySchema.parse(propertyData);
      } catch (validationError: any) {
        console.error('Validation error:', validationError);
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validationError.errors || validationError.message 
        });
      }
      
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
    } catch (error: any) {
      console.error('Property creation error:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
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

  // === BHOOMI AI CHAT ===
  app.post("/api/chat", async (req, res, next) => {
    try {
      const { message, conversationHistory } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const userName = req.isAuthenticated() ? (req.user as any)?.name : undefined;
      const result = await chatWithBhoomi(message, userName, conversationHistory || []);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  // === ADMIN ROUTES ===
  function isAdmin(req: any, res: any, next: any) {
    if (req.isAuthenticated() && (req.user as any).role === 'admin') return next();
    res.status(403).json({ error: 'Forbidden' });
  }

  // Stats
  app.get("/api/admin/stats", isAdmin, async (req, res, next) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) { next(error); }
  });

  // All users
  app.get("/api/admin/users", isAdmin, async (req, res, next) => {
    try {
      const allUsers = await storage.getAllUsers();
      res.json(allUsers);
    } catch (error) { next(error); }
  });

  // Update user (role, ban, etc.)
  app.patch("/api/admin/users/:id", isAdmin, async (req, res, next) => {
    try {
      const updated = await storage.adminUpdateUser(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'User not found' });
      res.json(updated);
    } catch (error) { next(error); }
  });

  // Delete user
  app.delete("/api/admin/users/:id", isAdmin, async (req, res, next) => {
    try {
      // Prevent deleting yourself
      if (req.params.id === (req.user as any).id) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
      }
      const deleted = await storage.adminDeleteUser(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'User not found' });
      res.sendStatus(204);
    } catch (error) { next(error); }
  });

  // All properties (including inactive/sold)
  app.get("/api/admin/properties", isAdmin, async (req, res, next) => {
    try {
      const allProperties = await storage.getAllPropertiesAdmin();
      res.json(allProperties);
    } catch (error) { next(error); }
  });

  // Admin update any property
  app.patch("/api/admin/properties/:id", isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const updated = await storage.adminUpdateProperty(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Property not found' });
      res.json(updated);
    } catch (error) { next(error); }
  });

  // Admin delete any property
  app.delete("/api/admin/properties/:id", isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.adminDeleteProperty(id);
      if (!deleted) return res.status(404).json({ error: 'Property not found' });
      res.sendStatus(204);
    } catch (error) { next(error); }
  });

  return httpServer;
}
