// server/routes/conversation.js
import express from "express";
import { createConversation, getConversations, getConversation } from "../controllers/conversationController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createConversation);
router.get("/", verifyToken, getConversations);
router.get("/:id", verifyToken, getConversation);

export default router;   // ✅ MUST BE DEFAULT EXPORT
