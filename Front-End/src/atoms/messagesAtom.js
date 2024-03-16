import { atom } from "recoil";


// Defined atom to manage conversations data
export const conversationsAtom = atom({
	key: "conversationsAtom",
	default: [],
});


// Defined atom to manage the selected conversation state
export const selectedConversationAtom = atom({
	key: "selectedConversationAtom",
	default: {
		_id: "",
		userId: "",
		username: "",
		userProfilePic: "",
	},
});