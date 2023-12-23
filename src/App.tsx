import "./App.css";
import { Container } from "@mui/material";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import IndividualManga from "./Pages/IndividualManga/IndividualManga";
import Reader from "./Pages/Reader/Reader";
import MangaCoverList from "./Pages/MangaCoverList";
import Library from "./Pages/Library";
import Account from "./Pages/Account/Account";
import Login from "./Pages/Login";

//#121212

function App() {
	return (
		<div style={{ backgroundColor: "#121212", minHeight: "100dvh" }}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/individualView' element={<IndividualManga />}></Route>
					<Route path='/mangaCoverList' element={<MangaCoverList />}></Route>
					<Route path='/reader' element={<Reader />}></Route>
					<Route path='/library' element={<Library />}></Route>
					<Route path='/account' element={<Account />}></Route>
					<Route path='/login' element={<Login />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
