import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export const load = () => {
	throw redirect(301, `${base}/blog2/tag/all/1`);
};
