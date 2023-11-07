import "./App.css";
import { Container } from "@mui/material";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import IndividualManga from "./Pages/IndividualManga";
import Reader from "./Pages/Reader";
import MangaCoverList from "./Pages/MangaCoverList";

//#121212

function App() {
	return (
		<div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/individualView' element={<IndividualManga />}></Route>
					<Route path='/mangaCoverList' element={<MangaCoverList />}></Route>
					<Route path='/reader' element={<Reader />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
