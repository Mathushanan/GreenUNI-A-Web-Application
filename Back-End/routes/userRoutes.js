import express from "express";
import {
	
	signupUser,
	loginUser,
	logoutUser,
	followUnFollowUser,
	updateUser,
	getUserProfile
} from "../controllers/userController.js";
import protectRoute from "../middleWares/protectRoute.js";


const router = express.Router();


router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.post("/update/:id", protectRoute, updateUser);
router.get("/profile/:username", getUserProfile);



export default router;
