import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import NavigationBubbles from "../Components/NavigationBubbles";
import NewAdditions from "../Components/NewAdditions";
import hxhdragondive from "../Assets/hxhdragondive.jpg";
import vagabondbuilding from "../Assets/vagabondbuilding.jpg";
import vagabondsky from "../Assets/vagabondSky.jpg";
import jjksukunavsjogo from "../Assets/jjksukunavsjogo.jpg";
import Header from "../Components/Header";
import Upcoming from "../Pages/Upcoming";
import jjkCover from "../Assets/cover.jpg";

const navButtons = [
	{ name: "Home", location: "/", background: hxhdragondive },
	{ name: "Library", location: "/library", background: vagabondbuilding },
	{ name: "Discover", location: "/discover", background: vagabondsky },
	{ name: "Social", location: "/social", background: jjksukunavsjogo },
];

const Home = () => {
	return (
		<Container disableGutters sx={{ minWidth: "100%", height: "100vh" }}>
			<Grid
				container
				direction='column'
				justifyContent='space-evenly'
				alignItems='center'
			>
				<Grid item sx={{ paddingTop: "1vh", width: "100%" }}>
					<Header />
				</Grid>
				<Grid item>
					<Typography sx={{ color: "white" }}>Recently Added</Typography>
					<Upcoming />
				</Grid>
				<Grid item>{/**<NewAdditions />*/}</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
