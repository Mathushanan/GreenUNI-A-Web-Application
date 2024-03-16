import {
	Flex,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../hooks/usePreviewImg";

const MessageInput = ({ setMessages }) => {

	// State for message text input
	const [messageText, setMessageText] = useState("");
	
	// Custom hook for showing toast messages
	const showToast = useShowToast();
	
	// Recoil state for selected conversation
	const selectedConversation = useRecoilValue(selectedConversationAtom);
	
	// Recoil state setter for conversations
	const setConversations = useSetRecoilState(conversationsAtom);
	
	// Reference for image input
	const imageRef = useRef(null);
	
	// Hook for controlling modal open/close state
	const { onClose } = useDisclosure();
	
	// Hook for previewing image before sending
	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
	
	// State for tracking if a message is being sent
	const [isSending, setIsSending] = useState(false);


	// Function to handle sending messages
	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!messageText && !imgUrl) return;
		if (isSending) return;

		setIsSending(true);

		try {

			// Sending message to backend API
			const res = await fetch("/api/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: messageText,
					recipientId: selectedConversation.userId,
					img: imgUrl,
				}),
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			console.log(data);

			// Updating messages state with new message
			setMessages((messages) => [...messages, data]);



			// Updating conversations state with last message data
			setConversations((prevConvs) => {
				const updatedConversations = prevConvs.map((conversation) => {
					if (conversation._id === selectedConversation._id) {
						return {
							...conversation,
							lastMessage: {
								text: messageText,
								sender: data.sender,
							},
						};
					}
					return conversation;
				});
				return updatedConversations;
			});


			// Resetting message text and image URL
			setMessageText("");
			setImgUrl("");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsSending(false);
		}
	};

	// Rendering the MessageInput component
	return (
		<Flex gap={2} alignItems={"center"}>
			<form onSubmit={handleSendMessage} style={{ flex: 95 }}>
				<InputGroup>
					<Input
						w={"full"}
						placeholder='Type a message'
						onChange={(e) => setMessageText(e.target.value)}
						value={messageText}
					/>
					<InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
						<IoSendSharp />
					</InputRightElement>
				</InputGroup>
			</form>
			<Flex flex={5} cursor={"pointer"}>
				<BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
				<Input type={"file"} hidden ref={imageRef} onChange={handleImageChange} />
			</Flex>
			<Modal
				isOpen={imgUrl}
				onClose={() => {
					onClose();
					setImgUrl("");
				}}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex mt={5} w={"full"}>
							<Image src={imgUrl} />
						</Flex>
						<Flex justifyContent={"flex-end"} my={2}>
							{!isSending ? (
								<IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage} />
							) : (
								<Spinner size={"md"} />
							)}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default MessageInput;