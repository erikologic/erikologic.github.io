import { z } from 'zod';

const postSchema = z.object({
	title: z.string(),
	slug: z.string(),
	description: z.string(),
	publishedDate: z.string(),
	modifiedDate: z.string().optional(),
	tags: z.array(z.string()),
	imageFile: z.string().optional(),
	imageAlt: z.string().optional(),
	imageWidth: z.number().optional(),
	imageHeight: z.number().optional(),
	PostContent: z.any()
});

export type Post = z.infer<typeof postSchema>;

const posts: Post[] = Object.entries(
	import.meta.glob(`../../../content/posts/*.md`, { eager: true })
)
	.map(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		([path, data]: [string, any]) => {
			const slug = path.split('/').pop()!.split('.').shift();
			try {
				return postSchema.parse({ ...data.metadata, slug, PostContent: data.default });
			} catch (e) {
				console.error(`Error parsing metadata for post ${slug}: ${e}`);
				throw e;
			}
		}
	)
	.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

const postsBySlug = posts.reduce(
	(acc, post) => {
		acc[post.slug] = post;
		return acc;
	},
	{} as { [key: string]: Post }
);

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
	.sort((a, b) => a.tag.localeCompare(b.tag))
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
export const getPost = async ({ post }: GetPostOptions) => postsBySlug[post];

interface GetTagsOptions {
	limit?: number;
}
export const getTags = async (options: GetTagsOptions) => {
	return Array.from(tags).slice(0, options.limit);
};
