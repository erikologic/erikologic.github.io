import type { SvelteComponent } from 'svelte';
import { error } from '@sveltejs/kit';
import type Post from '$lib/types/post';

interface MarkdownPost {
	PostContent: SvelteComponent;
	meta: Post;
}

export const load = async ({ params }): Promise<MarkdownPost> => {
	try {
		const post: SvelteComponent = await import(`../../../lib/content/posts/${params.post}.md`);

		if (post) {
			return {
				PostContent: post.default,
				meta: { ...post.metadata, slug: params.post }
			};
		} else {
			throw new Error('Post not found');
		}
	} catch (e) {
		const message = (e as Error)?.message || 'Post not found';
		throw error(404, message);
	}
};
