const baseUrl = "https://api.mangadex.org/";

export const CoverById = (coverArt: any) => `${baseUrl}cover/${coverArt}`;

export const RecentlyUpdated = () =>
	`${baseUrl}manga?limit=20&offset=0&includedTagsMode=AND&excludedTagsMode=OR&publicationDemographic%5B%5D=none&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&contentRating%5B%5D=pornographic&order%5BlatestUploadedChapter%5D=desc`;