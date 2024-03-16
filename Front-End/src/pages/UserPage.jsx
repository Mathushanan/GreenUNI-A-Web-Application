import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {

	// Fetching user profile data using custom hook
	const { user, loading } = useGetUserProfile();
	
	// Getting username from route parameters
	const { username } = useParams();
	
	// Using custom hook for showing toast messages
	const showToast = useShowToast();
	
	// Using Recoil state for posts data
	const [posts, setPosts] = useRecoilState(postsAtom);
	
	// State for tracking fetching posts status
	const [fetchingPosts, setFetchingPosts] = useState(true);

	useEffect(() => {
		const getPosts = async () => {
			if (!user) return;

			// Setting fetching posts status to true
			setFetchingPosts(true);
			try {

				// Fetching posts for the user
				const res = await fetch(`/api/posts/user/${username}`);
				
				// Parsing response data
				const data = await res.json();
				console.log(data);
				
				// Setting posts data in Recoil state
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {

				// Setting fetching posts status to false after completion
				setFetchingPosts(false);
			}
		};


		// Calling function to fetch posts
		getPosts();

	}, [username, showToast, setPosts, user]);


	// Display spinner while user profile data is loading
	if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}


	// If user not found, display error message
	if (!user && !loading) return <h1>User not found</h1>;

	return (
		<>
			<UserHeader user={user} />

			{!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
			{fetchingPosts && (
				<Flex justifyContent={"center"} my={12}>
					<Spinner size={"xl"} />
				</Flex>
			)}

			{posts.map((post) => (
				<Post key={post._id} post={post} postedBy={post.postedBy} />
			))}
		</>
	);
};

export default UserPage;
