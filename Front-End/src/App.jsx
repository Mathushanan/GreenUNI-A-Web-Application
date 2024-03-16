import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import { SettingsPage } from "./pages/SettingsPage";




function App() {

	const user = useRecoilValue(userAtom);
	const { pathname } = useLocation();


	return (

		// Container for the entire app
		<Box position={"relative"} w='full'>

			{/* Container for content, max width varies based on path */}
			<Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>

				{/* Header component */}
				<Header />

				{/* Routing setup */}
				<Routes>

					{/* Route for the homepage */}
					<Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
					
					{/* Route for authentication page */}
					<Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
					
					{/* Route for updating profile */}
					<Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

                    {/* Route for user profile */}
					<Route
						path='/:username'
						element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<UserPage />
							)
						}
					/>

					{/* Route for individual post */}
					<Route path='/:username/post/:pid' element={<PostPage />} />
					
					{/* Route for chat page */}
					<Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
					
					{/* Route for settings page */}
					<Route path='/settings' element={user ? <SettingsPage /> : <Navigate to={"/auth"} />} />
				</Routes>
			</Container>
		</Box>
	);
}

export default App;