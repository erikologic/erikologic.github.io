// import type { BasePageData } from '$lib/types/basePageData';
import { page } from '$app/stores';
import { getPosts, getTags } from '$lib/assets/js/utils/posts';

// export const load = async ({ params }): Promise<BasePageData> => {
export const load = async () => {
	// TODO limit
	const tags = await getTags();
	const recentPosts = await getPosts({ limit: 10 });

	return {
		meta: {
			title: `Blog - Tags`,
			description: `List of all blog tags`
		},
		tags: ['all', ...tags],
		recentPosts
	};
};
