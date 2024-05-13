// import type { BasePageData } from '$lib/types/basePageData';
import { getPosts } from '$lib/assets/js/utils/posts';

// export const load = async ({ params }): Promise<BasePageData> => {
export const load = async ({ params }) => {
	// const { tags, page } = params;
	const tags = params.tags;
	const page = Number(params.page);
	const posts = await getPosts({ tags, page });
	return {
		meta: {
			title: `Blog - ${tags} - ${page}`,
			description: `List of blog posts with tags ${tags} starting at page ${page}`
		},
		posts,
		tags,
		page,
		totalPages: 20
	};
};
