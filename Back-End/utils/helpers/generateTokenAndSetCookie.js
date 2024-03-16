import jwt from "jsonwebtoken";



// Function to generate a JWT, set it as a cookie, and return the token
const generateTokenAndSetCookie = (userId, res) => {
	
	
	// Generating the JWT with the provided userId and a secret key from environment variables
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});


	// Setting the JWT as a cookie in the response object
	res.cookie("jwt", token, {
		httpOnly: true, 
		maxAge: 15 * 24 * 60 * 60 * 1000, 
		sameSite: "strict",
	});

	return token;
};

export default generateTokenAndSetCookie;