// import type { BasePageData } from '$lib/types/basePageData';
import { getPosts } from '$lib/assets/js/utils/posts';

// export const load = async ({ params }): Promise<BasePageData> => {
export const load = async ({ params }) => {
	const tag = params.tag;
	const page = Number(params.page);
	const posts = await getPosts({ tag, page });
	return {
		meta: {
			title: `Blog - ${tag} - ${page}`,
			description: `List of blog posts with tag ${tag} starting at page ${page}`
		},
		posts,
		tag,
		page,
		// TODO avoid magic numbers
		totalPages: Math.ceil(posts.length / 10)
	};
};
