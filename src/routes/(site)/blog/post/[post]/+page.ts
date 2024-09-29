// import type { BasePageData } from '$lib/types/basePageData';
import { error } from '@sveltejs/kit';

import { getPost } from '$lib/assets/js/utils/posts';
import { getEnhancendImage, getImageUrl } from '$lib/assets/js/utils/images';

// export const load = async ({ params }): Promise<BasePageData> => {
export const load = async ({ params: { post }, url }) => {
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
			modifiedDate: myPost.modifiedDate,
			...(myPost.imageFile && {
				image: {
					url: url.origin + getImageUrl(myPost.imageFile),
					alt: myPost.imageAlt,
					width: myPost.imageWidth,
					height: myPost.imageHeight
				}
			})
		},
		PostContent: myPost.PostContent,
		// TODO fix types - this is horrible mainly because of that!
		...(myPost.imageFile && {
			EnhancedImage: getEnhancendImage(myPost.imageFile)
		})
	};
};
