import express from "express";
import {
	followUnFollowUser,
	getUserProfile,
	loginUser,
	logoutUser,
	signupUser,
	updateUser,
	getSuggestedUsers,
	freezeAccount,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();


// Route to get user profile by username or email
router.get("/profile/:query", getUserProfile);

// Route to get suggested users for the current user
router.get("/suggested", protectRoute, getSuggestedUsers);

// Route to sign up a new user
router.post("/signup", signupUser);

// Route to login a user
router.post("/login", loginUser);

// Route to logout a user
router.post("/logout", logoutUser);

// Route to follow or unfollow a user by ID
router.post("/follow/:id", protectRoute, followUnFollowUser);

// Route to update user information by ID
router.put("/update/:id", protectRoute, updateUser);

// Route to freeze or unfreeze user account
router.put("/freeze", protectRoute, freezeAccount);

export default router;
