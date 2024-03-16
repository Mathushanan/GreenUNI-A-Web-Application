import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";


// Custom hook for fetching user profile data
const useGetUserProfile = () => {

	// State to hold user profile data
	const [user, setUser] = useState(null);

	// State to indicate loading state while fetching data
	const [loading, setLoading] = useState(true);
	
	// Getting route parameters (username) from URL
	const { username } = useParams();
	const showToast = useShowToast();


	// Effect hook to fetch user profile data when component mounts or username changes
	useEffect(() => {
		const getUser = async () => {
			try {

				// Sending request to server to fetch user profile data based on username
				const res = await fetch(`/api/users/profile/${username}`);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				if (data.isFrozen) {
					setUser(null);
					return;
				}
				setUser(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};

		// Calling the function to fetch user profile data
		getUser();


	}, [username, showToast]);


	// Returning loading state and user profile data for external usage
	return { loading, user };
};

export default useGetUserProfile;