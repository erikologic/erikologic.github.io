import { base } from '$app/paths';

import { redirect } from '@sveltejs/kit';
import { fetchPosts } from '$lib/assets/js/utils';

// TODO: types
export const load = async ({ params, fetch }) => {
	const page = params.page ? Number(params.page) : 1;

	if (!page || page <= 1) {
		throw redirect(301, '/blog');
	}

	const offset = page * 10 - 10;
	const posts = await fetchPosts({ offset, limit: 10 });

	const count = await fetch(`${base}/api/posts/count`);
	const { total } = await count.json();

	return {
		posts,
		page,
		totalPosts: total
	};
};
