import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});


// Function to get the socket ID of a recipient user
export const getRecipientSocketId = (recipientId) => {
	return userSocketMap[recipientId];
};

const userSocketMap = {}; // userId: socketId

io.on("connection", (socket) => {
	console.log("user connected", socket.id);
	const userId = socket.handshake.query.userId;


	// Storing user's socket ID
	if (userId != "undefined") userSocketMap[userId] = socket.id;
	
	// Emitting online users to all connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));


	// Handling event to mark messages as seen
	socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
		try {

			// Updating messages as seen
			await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });
			
			// Updating last message in conversation as seen
			await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });
			
			// Emitting event to notify user that messages have been seen
			io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
		} catch (error) {
			console.log(error);
		}
	});

	// Handling disconnection of a user
	socket.on("disconnect", () => {
		console.log("user disconnected");

		// Deleting user's socket ID from map
		delete userSocketMap[userId];

		// Emitting updated online users to all connected clients
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { io, server, app };