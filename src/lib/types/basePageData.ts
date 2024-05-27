export interface BaseMetadata {
	title: string;
	description: string;
	type?: string;

	image?: {
		url: string;
		width: string;
		height: string;
	};
}

export interface BasePageData {
	meta: BaseMetadata;
}
