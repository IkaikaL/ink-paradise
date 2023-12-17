import { useState, useEffect } from "react";
import {
	Container,
	Grid,
	Typography,
	Button,
	List,
	ListItemButton,
	ListItemText,
	Collapse,
	Box,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import StandardButton from "../Components/StandardButton";
import { useNavigate } from "react-router-dom";
import TrendingMangaSection from "../Components/TrendingMangaSection";
import HomepageSectionDisplay from "../Components/HomepageSectionDisplay";

import {
	fetchMangaById,
	fetchRecentlyUpdated,
	fetchRecentlyAdded,
	fetchMangaTags,
} from "../api/MangaDexApi";

import { fetchTopManga } from "../api/MalApi";

const baseUrlMangaDex = "https://api.mangadex.org";
const baseUrlMal = "https://api.jikan.moe/v4";

const Home = () => {
	const [open, setOpen] = useState(false);
	const [topMangaData, setTopMangaData] = useState<any[]>([]);
	const [recentlyUpdatedManga, setRecentlyUpdatedManga] = useState<any[]>([]);
	const [recentlyAddedManga, setRecentlyAddedManga] = useState<any[]>([]);
	const [mangaTags, setMangaTags] = useState<any[]>([]);
	let navigate = useNavigate();

	const handleClickRecentlyUpdated = async () => {
		navigate("/mangaCoverList", {
			state: { listType: "RecentlyUpdated" },
		});
	};

	const handleClickMangaCoverListRA = async () => {
		navigate("/mangaCoverList", {
			state: { listType: "RecentlyAdded" },
		});
	};

	useEffect(() => {
		fetchTopManga().then((data: any) => {
			setTopMangaData(data);
		});
		fetchRecentlyUpdated(10, 0).then((data: Object[]) => {
			setRecentlyUpdatedManga(data);
		});

		fetchMangaTags().then((data: Object[]) => {
			setMangaTags(data);
		});

		fetchRecentlyAdded(10, 0).then((data: Object[]) => {
			setRecentlyAddedManga(data);
		});
	}, []);

	const handleOpenTags = () => {
		setOpen(!open);
	};

	return (
		<div style={{ minHeight: "100vh" }}>
			<Grid
				container
				direction='column'
				justifyContent='space-between'
				alignItems='center'
				sx={{ flexWrap: "nowrap", minHeight: "100vh" }}
			>
				<Grid item sx={{ width: "100%" }}>
					<Header />
				</Grid>

				<Grid
					item
					sx={{
						width: "100%",
					}}
				>
					<Grid
						container
						direction='row'
						justifyContent='space-evenly'
						alignItems='center'
						sx={{}}
					>
						<Grid
							item
							sx={{
								width: "31%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography textTransform='none' noWrap color={"white"}>
								Recently Added
							</Typography>
							<HomepageSectionDisplay
								section='Recently Added'
								mangaData={recentlyAddedManga}
							/>
							<Button
								sx={{
									color: "#121212",
									backgroundColor: "transparent",
									"&.MuiButtonBase-root:hover": {
										bgcolor: "transparent",
									},
									width: "20px",
									height: "20px",
								}}
							>
								<ExpandMore
									sx={{ color: "#333333" }}
									onClick={() => handleClickMangaCoverListRA()}
								/>
							</Button>
						</Grid>
						<Grid
							item
							sx={{
								width: "31%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								paddingBottom: "20px",
							}}
						>
							<Typography color='white'>Trending Now</Typography>
							<TrendingMangaSection mangaData={topMangaData} />
						</Grid>
						<Grid
							item
							sx={{
								width: "31%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography color='white' noWrap>
								Recently Updated
							</Typography>
							<HomepageSectionDisplay
								section='Recently Updated'
								mangaData={recentlyUpdatedManga}
							/>
							<Button
								sx={{
									color: "#121212",
									backgroundColor: "transparent",
									"&.MuiButtonBase-root:hover": {
										bgcolor: "transparent",
									},
									width: "20px",
									height: "20px",
								}}
							>
								<ExpandMore
									sx={{ color: "#333333" }}
									onClick={() => handleClickRecentlyUpdated()}
								/>
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					sx={{
						width: { xs: "100%", lg: "90%" },
					}}
				>
					<List
						sx={{
							width: "100%",
							justifyContent: "center",
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<ListItemButton
							sx={{
								width: "100px",
								color: "#121212",
								backgroundColor: "transparent",
								"&.MuiButtonBase-root:hover": {
									bgcolor: "transparent",
								},
							}}
							onClick={() => handleOpenTags()}
						>
							<ListItemText sx={{ color: "white" }} primary='Tags' />
							{open ? (
								<ExpandLess sx={{ color: "#333333" }} />
							) : (
								<ExpandMore sx={{ color: "#333333" }} />
							)}
						</ListItemButton>
						<Collapse
							sx={{
								width: "100%",
							}}
							in={open}
							timeout='auto'
						>
							<Grid
								container
								justifyContent='center'
								direction='row'
								alignItems='center'
								spacing={0.5}
							>
								{mangaTags.map((element: any) => (
									<Grid item>
										<StandardButton
											backgroundColor='#191919'
											width='120px'
											height='20px'
											textColor='#333333'
											fontSizeXs={10}
											fontSizeSm={10}
											fontSizeLg={12}
											text={element["attributes"].name["en"]}
											location={"mangaList"}
											tagId={element["id"]}
										/>
									</Grid>
								))}
							</Grid>
						</Collapse>
					</List>
				</Grid>
				<Grid
					item
					sx={{
						width: "100%",
					}}
				>
					<Footer />
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;
