import { Router } from "express";
import multer from "multer";
import cloudinary from "../Utils/cloudinary.js";

const router = Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'));
    }
  }
});

router.post(
  "/image",
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log("Uploading file:", req.file.originalname, req.file.mimetype);
      
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "menu-backgrounds",
          resource_type: "auto", // Changed to "auto" to handle GIFs properly
        }
      );

      console.log("Upload successful:", result.secure_url);
      
      return res.json({ url: result.secure_url });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      return res.status(500).json({ 
        error: "Upload failed",
        details: err.message 
      });
    }
  }
);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: "File too large", 
        details: "Maximum file size is 10MB" 
      });
    }
    return res.status(400).json({ 
      error: "File upload error", 
      details: err.message 
    });
  }
  if (err) {
    return res.status(400).json({ 
      error: err.message 
    });
  }
  next();
});

export default router;