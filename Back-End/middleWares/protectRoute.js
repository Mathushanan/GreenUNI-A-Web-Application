import User from "../models/userModel.js";
import jwt from "jsonwebtoken";



// Middleware to protect routes by verifying JWT token
const protectRoute = async (req, res, next) => {
	try {

		// Get JWT token from request cookies
		const token = req.cookies.jwt;


		// If token is not provided, return Unauthorized status
		if (!token) return res.status(401).json({ message: "Unauthorized" });


		// Verify the token using the JWT_SECRET from environment variables
		const decoded = jwt.verify(token, process.env.JWT_SECRET);


		// Find the user based on the decoded user ID from the token and exclude the password field
		const user = await User.findById(decoded.userId).select("-password");


		// Attach the user object to the request object for further middleware or route handling
		req.user = user;

		// Call the next middleware or route handler
		next();
		
	} catch (err) {
		res.status(500).json({ message: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

export default protectRoute;