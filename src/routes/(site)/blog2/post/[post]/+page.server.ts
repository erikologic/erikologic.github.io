// import type { BasePageData } from '$lib/types/basePageData';

import { getPost } from '$lib/assets/js/utils/posts';

// export const load = async ({ params }): Promise<BasePageData> => {
export const load = async ({ params: { post } }) => {
	const myPost = await getPost({ post });
	return {
		meta: {
			title: myPost.title,
			description: myPost.description,
			tags: myPost.tags,
			publishedTime: myPost.publishedTime,
			modifiedTime: myPost.modifiedTime
		},
		PostContent: undefined
	};
};
