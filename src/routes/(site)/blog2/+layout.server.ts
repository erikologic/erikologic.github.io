// import type { BasePageData } from '$lib/types/basePageData';
import { getPosts, getTags } from '$lib/assets/js/utils/posts';

// export const load = async ({ params }): Promise<BasePageData> => {
export const load = async () => {
	const tags = await getTags();
	const recentPosts = await getPosts();

	return {
		meta: {
			title: `Blog - Tags`,
			description: `List of all blog tags`
		},
		tags,
		recentPosts
	};
};
