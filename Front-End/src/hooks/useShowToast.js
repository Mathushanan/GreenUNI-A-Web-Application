import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";



// Custom hook for showing toast notifications using Chakra UI's useToast hook
const useShowToast = () => {



	// Accessing the useToast hook from Chakra UI
	const toast = useToast();


	// Callback function to display a toast notification
	const showToast = useCallback(
		(title, description, status) => {
			toast({
				title,
				description,
				status,
				duration: 3000,
				isClosable: true,
			});
		},
		[toast]
	);


	// Returning the callback function for showing toast notifications
	return showToast;
};

export default useShowToast;