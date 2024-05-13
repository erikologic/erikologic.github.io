import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export const load = ({params}) => {
	throw redirect(301, `${base}/blog2/tag/${params.tag}/1`);
};
