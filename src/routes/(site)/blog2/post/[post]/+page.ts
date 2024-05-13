// import type { BasePageData } from '$lib/types/basePageData';
import { error } from '@sveltejs/kit';

import { getPost } from '$lib/assets/js/utils/posts2';

// export const load = async ({ params }): Promise<BasePageData> => {
export const load = async ({ params: { post } }) => {
	const myPost = await getPost({ post });
	if (!myPost) {
		error(404, {
			message: 'Not found'
		});
	}
	return {
		meta: {
			title: myPost.title,
			description: myPost.description,
			tags: myPost.tags,
			publishedDate: myPost.publishedDate,
			modifiedDate: myPost.modifiedDate
		},
		PostContent: myPost.PostContent
	};
};
