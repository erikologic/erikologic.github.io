// TODO this should come from the list of articles!
const posts = [
	{
		slug: 'hello-world',
		title: 'Hello World',
		description: 'This is the first post on this blog',
		publishedTime: '2021-01-01',
		tags: ['personal']
	}
];
const defaultOptions = {
	tags: 'all',
	page: 1
};

export const getPosts = async ({ tags, page } = defaultOptions) => {
	return posts;
};

// TODO this should come from an actual article!
const helloWorldPost = {
	slug: 'hello-world',
	title: 'Hello World',
	description: 'This is the first post on this blog',
	publishedTime: '2021-01-01',
	modifiedTime: '2021-01-01',
	tags: ['personal']
};

export const getPost = async ({ post }) => helloWorldPost;


// TODO this should come from the list of articles!
const tags = ['personal', 'tech', 'food', 'travel'];
export const getTags = async () => tags;