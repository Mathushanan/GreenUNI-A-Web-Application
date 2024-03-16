import { Button } from "@chakra-ui/button";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { FiLogOut } from "react-icons/fi";
import useShowToast from "../hooks/useShowToast";

const LogoutButton = () => {

	// Recoil state setter for user data
	const setUser = useSetRecoilState(userAtom);
	const showToast = useShowToast();

	// Function to handle logout process
	const handleLogout = async () => {
		try {
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

			localStorage.removeItem("user-threads");
			setUser(null);
		} catch (error) {
			showToast("Error", error, "error");
		}
	};


	// Rendering the LogoutButton component
	return (
		<Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
			<FiLogOut size={20} />
		</Button>
	);
};

export default LogoutButton;