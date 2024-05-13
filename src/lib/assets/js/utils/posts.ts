// TODO this should come from the list of articles!
// It is safe to store things in memory here because we are building for a static site
const posts = [
	{
		slug: 'hello-world',
		title: 'Hello World',
		description: 'This is the first post on this blog',
		publishedTime: '2021-01-01',
		modifiedTime: '2021-01-01',
		tags: ['personal']
	},
	{
		slug: 'foo-bar',
		title: 'Foo Bar',
		description: 'This is a foo bar',
		publishedTime: '2019-01-01',
		modifiedTime: '2019-01-01',
		tags: ['foo-bar']
	}
];

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
