import mongoose from "mongoose";


// Define message schema
const messageSchema = new mongoose.Schema(
	{
		conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		text: String,
		seen: {
			type: Boolean,
			default: false,
		},
		img: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);


// Create Message model from the message schema
const Message = mongoose.model("Message", messageSchema);

export default Message;