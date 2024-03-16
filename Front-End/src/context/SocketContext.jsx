import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../atoms/userAtom";


// Creating a new context for Socket
const SocketContext = createContext();


// Custom hook to access Socket context
export const useSocket = () => {
	return useContext(SocketContext);
};


// Provider component for Socket context
export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const user = useRecoilValue(userAtom);


	// Establishing socket connection upon component mount
	useEffect(() => {
		const socket = io("http://localhost:5000", {
			query: {
				userId: user?._id,
			},
		});


		// Setting the socket instance to state
		setSocket(socket);


		// Listening for "getOnlineUsers" event from the server
		socket.on("getOnlineUsers", (users) => {
			setOnlineUsers(users);
		});

		// Cleaning up socket connection on component unmount
		return () => socket && socket.close();
	}, [user?._id]);


	// Providing the Socket context to children components
	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};