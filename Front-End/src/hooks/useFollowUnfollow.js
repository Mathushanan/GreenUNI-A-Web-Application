import { useState } from "react";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";


// Custom hook for handling follow/unfollow functionality
const useFollowUnfollow = (user) => {

	// Getting current user data from Recoil state
	const currentUser = useRecoilValue(userAtom);
	
	// State to track whether the current user is following the given user
	const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
	
	// State to track the updating state during follow/unfollow process
	const [updating, setUpdating] = useState(false);
	
	
	const showToast = useShowToast();


	// Function to handle follow/unfollow action
	const handleFollowUnfollow = async () => {
		if (!currentUser) {
			showToast("Error", "Please login to follow", "error");
			return;
		}

		// Preventing multiple follow/unfollow requests while updating
		if (updating) return;


		// Setting updating state to true to indicate ongoing operation
		setUpdating(true);

		try {

			// Sending follow/unfollow request to the server
			const res = await fetch(`/api/users/follow/${user._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}


			// Handling follow/unfollow success
			if (following) {
				showToast("Success", `Unfollowed ${user.name}`, "success");
				user.followers.pop(); // simulate removing from followers
			} else {
				showToast("Success", `Followed ${user.name}`, "success");
				user.followers.push(currentUser?._id); // simulate adding to followers
			}

			// Toggling following state
			setFollowing(!following);

			console.log(data);
		} catch (error) {
			showToast("Error", error, "error");
		} finally {
			setUpdating(false);
		}
	};


	// Returning necessary values and functions for external usage
	return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;
