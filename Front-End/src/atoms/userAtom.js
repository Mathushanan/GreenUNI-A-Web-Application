import { atom } from "recoil";


// Defined atom for managing user data
const userAtom = atom({
	key: "userAtom",
	default: JSON.parse(localStorage.getItem("user-threads")),
});

export default userAtom;