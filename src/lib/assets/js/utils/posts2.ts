import type { SvelteComponent } from "svelte";

interface Post {
	title: string;
	slug: string;
	description: string;
	publishedDate: string;
	modifiedDate: string;
	tags: string[];
	PostContent: SvelteComponent;
}

const posts: Post[] = Object.entries(
	import.meta.glob(`../../../content/posts2/*.md`, { eager: true })
)
	.map(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		([path, data]: [string, any]) => {
			const slug = path.split('/').pop()!.split('.').shift();
			return { ...data.metadata, slug, PostContent: data.default };
		}
	)
	.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

const tagKeyToCount = posts
	.flatMap((post) => post.tags)
	.reduce(
		(acc, tag) => {
			acc[tag] = (acc[tag] || 0) + 1;
			return acc;
		},
		{} as { [key: string]: number }
	);
interface Tag {
	tag: string;
	count: number;
}
const tags: Tag[] = Object.entries(tagKeyToCount)
	.map(([tag, count]) => ({ tag, count }))
	.sort((a, b) => b.count - a.count);

interface GetPostsOptions {
	tag?: string;
	page?: number;
	limit?: number;
}
const defaultOptions = {
	tag: 'all',
	page: 1,
	limit: 10
};
export const getPosts = async (opts: GetPostsOptions) => {
	const { tag, page, limit } = { ...defaultOptions, ...opts };
	return posts
		.filter((p) => tag === 'all' || p.tags.includes(tag))
		.slice((page - 1) * limit, page * limit);
};

interface GetPostOptions {
	post: string;
}
export const getPost = async ({ post }: GetPostOptions) => posts.find((p) => p.slug === post);

interface GetTagsOptions {
	limit?: number;
}
const defaultTagsOptions = {
	limit: undefined
};
export const getTags = async ({ limit }: GetTagsOptions) => {
	const options = { ...defaultTagsOptions, limit };
	return Array.from(tags).slice(0, options.limit);
};
