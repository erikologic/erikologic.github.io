export default interface Post {
	categories: string[];
	coverImage: string;
	coverWidth?: number;
	coverHeight?: number;
	date: string;
	description: string;
	slug: string;
	subtitle?: string;
	title: string;
	updated?: string;
	draft?: boolean;
}
