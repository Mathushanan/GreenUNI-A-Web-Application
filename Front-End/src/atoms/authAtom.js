import { atom } from "recoil";


// Defined atom for managing authentication.
const authScreenAtom = atom({
	key: "authScreenAtom",
	default: "login",
});


export default authScreenAtom;