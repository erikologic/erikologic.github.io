import type { BasePageData } from '$lib/types/basePageData';

// TODO use in other places
export const load = async (): Promise<BasePageData> => {
	return {
		meta: {
			title: '/',
			description: 'Home page'
		}
	};
};
