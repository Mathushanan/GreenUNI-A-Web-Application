import mongoose from "mongoose";


// Define conversation schema
const conversationSchema = new mongoose.Schema(
	{
		// Array of participants referencing the User model
		participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		
		// Details of the last message in the conversation
		lastMessage: {
			text: String,
			sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			seen: {
				type: Boolean,
				default: false,
			},
		},
	},
	{ timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create Conversation model from the conversation schema
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;