import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getMessages, sendMessage, getConversations } from "../controllers/messageController.js";

const router = express.Router();


// Route to get all conversations
router.get("/conversations", protectRoute, getConversations);

// Route to get messages between current user and another user
router.get("/:otherUserId", protectRoute, getMessages);

// Route to send a message
router.post("/", protectRoute, sendMessage);

export default router;