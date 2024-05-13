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

// TODO count tags from articles
const tags = new Set(posts.flatMap((p) => p.tags));

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
	return posts.slice((page - 1) * limit, page * limit);
};

interface GetPostOptions {
	post: string;
}
export const getPost = async ({ post }: GetPostOptions) => posts.find((p) => p.slug === post);

export const getTags = async () => tags;
