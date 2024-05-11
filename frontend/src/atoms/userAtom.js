import { atom } from "recoil";

// Get user data from localStorage
const userData = JSON.parse(localStorage.getItem("user-threads"));

// Define default value for userAtom
const defaultUser = userData ? userData : null;

const userAtom = atom({
	key: "userAtom",
	default: defaultUser,
});

export default userAtom;
