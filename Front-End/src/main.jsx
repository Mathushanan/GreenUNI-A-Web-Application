import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SocketContextProvider } from "./context/SocketContext.jsx";


// Define styles for the app
const styles = {
	global: (props) => ({
		body: {
			color: mode("gray.800", "whiteAlpha.900")(props),
			bg: mode("gray.100", "#101010")(props),
		},
	}),
};


// Define configuration for the Chakra UI theme
const config = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};


// Define custom colors for the theme
const colors = {
	gray: {
		light: "#616161",
		dark: "#1e1e1e",
	},
};


// Extend the Chakra UI theme with custom configuration, styles, and colors
const theme = extendTheme({ config, styles, colors });


// Render the app to the DOM
ReactDOM.createRoot(document.getElementById("root")).render(
	
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<SocketContextProvider>
						<App />
					</SocketContextProvider>
				</ChakraProvider>
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>
);