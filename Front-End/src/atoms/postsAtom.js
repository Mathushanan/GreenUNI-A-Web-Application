import { atom } from "recoil";


// Defined atom for managing posts data
const postsAtom = atom({
	key: "postsAtom",
	default: [],
});

export default postsAtom;