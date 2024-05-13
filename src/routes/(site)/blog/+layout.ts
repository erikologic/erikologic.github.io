// import type { BasePageData } from '$lib/types/basePageData';
import { getPosts, getTags } from '$lib/assets/js/utils/posts';

// export const load = async ({ params }): Promise<BasePageData> => {
export const load = async () => {
	// TODO limit
	const tags = (await getTags({ limit: 5 })).map(({ tag }) => tag);
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
