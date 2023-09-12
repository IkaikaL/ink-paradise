import React, { useState } from "react";
import {
	Card,
	Container,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Box,
	Grid,
} from "@mui/material";
import mangaCover from "../Assets/cover.jpg";

type Props = {
	manga: {
		name: string;
		updatedDate: string;
		latestChapter: string;
		cover: string;
		destination: string;
	};
};

const MangaClickable = (props: Props) => {
	const { manga } = props;
	const [showDetails, setShowDetails] = useState(false);
	return (
		<Container>
			<Button
				sx={{
					color: "black",
					"&.MuiButtonBase-root:hover": {
						bgcolor: "transparent",
					},
				}}
				onMouseEnter={() => setShowDetails(true)}
				onMouseLeave={() => setShowDetails(false)}
			>
				<div style={{ maxWidth: "220px" }}>
					<Card
						sx={{
							height: "300px",
							width: "200px",
						}}
					>
						<CardMedia sx={{ height: "100%" }} image={manga.cover} />
						{showDetails && (
							<Grid
								container
								direction='row'
								justifyContent='space-between'
								alignItems='center'
								sx={{ marginTop: "-20px" }}
							>
								<Grid item>
									<Card
										sx={{
											backgroundColor: "#000000",
											opacity: 0.8,
											height: "50px",
											width: "80px",
											borderRadius: 1,
										}}
									>
										<Typography fontSize={13} color='white'>
											{manga.updatedDate}
										</Typography>
									</Card>
								</Grid>

								<Grid item>
									<Card
										sx={{
											backgroundColor: "#000000",
											height: "50px",
											opacity: 0.8,
											width: "80px",
											borderRadius: 1,
										}}
									>
										<Typography
											fontSize={13}
											color='white'
											textTransform='none'
										>
											{manga.latestChapter}
										</Typography>
									</Card>
								</Grid>
							</Grid>
						)}
					</Card>
					<div style={{ paddingTop: "5px" }}>
						<Typography
							fontSize={15}
							noWrap
							color='#EFEAD8'
							textTransform='none'
						>
							{manga.name}
						</Typography>
					</div>
				</div>
			</Button>
		</Container>
	);
};

export default MangaClickable;
