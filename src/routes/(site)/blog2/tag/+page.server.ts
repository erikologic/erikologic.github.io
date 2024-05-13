// import type { BasePageData } from '$lib/types/basePageData';

import { getTags } from '$lib/assets/js/utils/posts';

// export const load = async ({ params }): Promise<BasePageData> => {
export const load = async () => {
	const tags = await getTags({});
	return {
		meta: {
			title: `Blog - Tags`,
			description: `List of all blog tags`
		},
		tags
	};
};
