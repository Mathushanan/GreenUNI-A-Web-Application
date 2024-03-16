import userAtom from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";
import useShowToast from "./useShowToast";


// Custom hook for handling logout functionality
const useLogout = () => {

	// State setter for user data
	const setUser = useSetRecoilState(userAtom);
	const showToast = useShowToast();


	// Function to perform logout operation
	const logout = async () => {
		try {

			// Sending logout request to the server
			const res = await fetch("/api/users/logout", {
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
            // Removing user data from local storage upon successful logout
			localStorage.removeItem("user-threads");
			setUser(null);
		} catch (error) {
			showToast("Error", error, "error");
		}
	};

	// Returning the logout function for external usage
	return logout;
};

export default useLogout;