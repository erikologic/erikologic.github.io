import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export const load = () => {
	throw redirect(301, `${base}/blog/tag/all/1`);
};
