import { useState } from "react";
import useShowToast from "./useShowToast";


// Custom hook for previewing image before upload
const usePreviewImg = () => {

	// State to store the URL of the selected image
	const [imgUrl, setImgUrl] = useState(null);
	const showToast = useShowToast();

	// Function to handle image selection
	const handleImageChange = (e) => {

		// Retrieving the selected file
		const file = e.target.files[0];

		// Checking if the selected file is an image
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();


			// Event handler for when the FileReader finishes reading the file
			reader.onloadend = () => {

				// Setting the URL of the image to state
				setImgUrl(reader.result);
			};

			// Reading the selected image file as a data URL
			reader.readAsDataURL(file);
		} else {
			showToast("Invalid file type", " Please select an image file", "error");
			setImgUrl(null);
		}
	};

	// Returning the image change handler function, image URL, and function to set the image URL
	return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
