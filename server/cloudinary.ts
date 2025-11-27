import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for avatars
export const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'landnest/avatars',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { width: 500, height: 500, crop: 'fill', gravity: 'face' }
      ],
      public_id: `avatar-${Date.now()}-${Math.round(Math.random() * 1E9)}`,
    };
  },
});

// Storage for property images
export const propertyStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'landnest/properties',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { width: 1920, height: 1080, crop: 'limit', quality: 'auto' }
      ],
      public_id: `property-${Date.now()}-${Math.round(Math.random() * 1E9)}`,
    };
  },
});

export default cloudinary;
