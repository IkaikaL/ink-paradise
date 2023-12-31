import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import MangaBanner from "../../Components/MangaBanner/MangaBanner";
import MangaTags from "../../Components/MangaTags/MangaTags";
import MangaControls from "../../Components/MangaControls/MangaControls";
import MangaChapterList from "../../Components/MangaChapterList/MangaChapterList";

import {
	Relationship,
	Manga,
	CoverFile,
	MangaTagsInterface,
	MangaFeed,
} from "../../interfaces/MangaDexInterfaces";

import {
	fetchMangaByName,
	fetchMangaCover,
	fetchMangaFeed,
	fetchMangaById,
} from "../../api/MangaDexApi";

import "./IndividualManga.css";

const IndividualManga = () => {
	const { state } = useLocation();
	const [mangaId, setMangaId] = useState<string>("");
	const [mangaFromMalCoverFile, setMangaFromMalCoverFile] =
		useState<string>("");
	const [mangaName, setMangaName] = useState("");
	const [mangaDescription, setMangaDescription] = useState("");
	const [mangaAltTitles, setMangaAltTitles] = useState<object[]>([]);
	const [mangaLanguages, setMangaLanguages] = useState<string[]>([]);
	const [mangaContentRating, setMangaContentRating] = useState("");
	const [mangaRaw, setMangaRaw] = useState("");
	const [mangaTags, setMangaTags] = useState<MangaTagsInterface[]>([]);
	const [mangaFeed, setMangaFeed] = useState<MangaFeed[]>([]);
	const [selectedLanguage, setSelectedLanguage] = useState("en");
	const [currentOffset, setCurrentOffset] = useState(0);
	const [currentOrder, setCurrentOrder] = useState("asc");
	const [scantalationGroups, setScantalationGroups] = useState<object[]>([]);

	useEffect(() => {
		if (state["title"] !== undefined) {
			fetchMangaByName(state["title"]).then((data: Manga[]) => {
				console.log(data);
				setMangaId(data[0].id);
				setMangaName(data[0].attributes.title.en);
				setMangaDescription(data[0].attributes.description.en);
				setMangaAltTitles(data[0].attributes.altTitles);
				setMangaLanguages(data[0].attributes.availableTranslatedLanguages);
				setMangaContentRating(data[0].attributes.contentRating);
				setMangaRaw("");
				setMangaTags(data[0].attributes.tags);

				const coverArtRelationship = data[0].relationships.find(
					(i: Relationship) => i.type === "cover_art",
				);

				if (coverArtRelationship) {
					const coverArt = coverArtRelationship.id;
					fetchMangaCover(coverArt).then((coverFile: CoverFile) => {
						setMangaFromMalCoverFile(coverFile.attributes.fileName);
					});
				}
				fetchMangaFeed(
					data[0].id,
					50,
					currentOffset,
					currentOrder,
					selectedLanguage,
				).then((data: MangaFeed[]) => {
					data.length === 0 ? setCurrentOffset(0) : setMangaFeed(data);

					setScantalationGroups([]);
					/**
						data.forEach((current: any) => {
							fetchScantalationGroup(current["relationships"][0]["id"]).then(
								(data) => {
									setScantalationGroups((scantalationGroups) => [
										...scantalationGroups,
										data["attributes"]["name"],
									]);
								}
							);
						}); */
					console.log(data);
				});
			});
			//fetchMangaByName();
		} else {
			fetchMangaById(state.id).then((data: Manga) => {
				console.log(data);
				setMangaName(data.attributes.title.en);
				setMangaDescription(data.attributes.description.en);
				setMangaAltTitles(data.attributes.altTitles);
				setMangaLanguages(data.attributes.availableTranslatedLanguages);
				setMangaContentRating(data.attributes.contentRating);

				setMangaRaw(
					data["attributes"].links === null ? "" : data["attributes"].links.raw,
				);

				setMangaTags(data["attributes"].tags);
			});
			fetchMangaFeed(
				state.id,
				50,
				currentOffset,
				currentOrder,
				selectedLanguage,
			).then((data: MangaFeed[]) => {
				data.length === 0 ? setCurrentOffset(0) : setMangaFeed(data);
				/**
					setScantalationGroups([]);
					data.forEach((current: any) => {
						fetchScantalationGroup(current["relationships"][0]["id"]).then(
							(data) => {
								setScantalationGroups((scantalationGroups) => [
									...scantalationGroups,
									data["attributes"]["name"],
								]);
							}
						);
					});
				*/
			});
		}
	}, [state, selectedLanguage, currentOffset, currentOrder]);

	return (
		<div>
			<div className='header'>
				<Header />
			</div>

			<MangaBanner
				title={state.title}
				id={state.id}
				coverFile={state.coverFile}
				mangaFromMal={mangaId}
				mangaFromMalCoverFile={mangaFromMalCoverFile}
				mangaAltTitles={mangaAltTitles}
				mangaDescription={mangaDescription}
				mangaContentRating={mangaContentRating}
				mangaName={mangaName}
			/>

			<div>
				<MangaTags mangaTags={mangaTags} />
			</div>
			<div className='centered-content'>
				<Button className='raw-button' href={mangaRaw}>
					<Typography noWrap color='#333333' sx={{ fontSize: 10 }}>
						RAW
					</Typography>
				</Button>
			</div>
			<div className='controls-chapters-section'>
				<div className='manga-controls'>
					<MangaControls
						mangaLanguages={mangaLanguages}
						currentOffset={currentOffset}
						setCurrentOffset={setCurrentOffset}
						currentOrder={currentOrder}
						setCurrentOrder={setCurrentOrder}
						selectedLanguage={selectedLanguage}
						setSelectedLanguage={setSelectedLanguage}
						mangaTranslators={scantalationGroups}
						setTranslator={setScantalationGroups}
					/>
				</div>
				<div className='manga-chapter-list'>
					<MangaChapterList
						mangaFeed={mangaFeed}
						mangaName={mangaName}
						selectedLanguage={selectedLanguage}
						mangaId={state.id === undefined ? mangaId : state.id}
						insideReader={false}
						scantalationGroups={scantalationGroups}
					/>
				</div>
			</div>

			<div className='footer'>
				<Footer />
			</div>
		</div>
	);
};

export default IndividualManga;
