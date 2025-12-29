// middleware/auth.js
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    if (process.env.AUTH_MODE === "mock") {
      req.user = {
        id: 123,
        name: "Test User" 
      };
      return next();
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};