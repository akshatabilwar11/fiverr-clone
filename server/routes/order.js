// server/routes/order.js
import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/verifyToken.js";  // ✅ IMPORT THIS

const router = express.Router();

// ✅ Protect routes with verifyToken
router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrder);

export default router;
