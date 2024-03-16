import express from "express";
import {
	createPost,getPost,deletePost,likeUnlikePost,replyToPost,getFeedPosts, getUserPosts
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";


const router = express.Router();

// Route to get posts in the feed
router.get("/feed", protectRoute, getFeedPosts);

// Route to get a specific post by its ID
router.get("/:id", getPost);

// Route to create a new post
router.post("/create",protectRoute, createPost);

// Route to delete a post by its ID
router.delete("/:id", protectRoute, deletePost);

// Route to like or unlike a post by its ID
router.put("/like/:id", protectRoute, likeUnlikePost);

// Route to reply to a post by its ID
router.put("/reply/:id", protectRoute, replyToPost);

// Route to get posts by a specific user
router.get("/user/:username", getUserPosts);

export default router;