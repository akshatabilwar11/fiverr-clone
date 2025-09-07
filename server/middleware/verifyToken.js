// server/middleware/verifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ must match your .env

    req.userId = decoded.id;
    req.isSeller = decoded.isSeller;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message); // 🔍 debug
    return res.status(403).json({ error: "Invalid token" });
  }
};
