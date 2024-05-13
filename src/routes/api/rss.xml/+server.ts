// TODO: types
import config from '$lib/config';
import { getPosts, type Post } from '$lib/assets/js/utils/posts';

export const GET = async () => {
	const data = await getPosts({});

	const body: string = render(data);
	const headers = {
		'Cache-Control': `max-age=0, s-maxage=3600`,
		'Content-Type': 'application/xml'
	};
	return new Response(body, {
		status: 200,
		headers
	});
};

const render = (posts: Post[]): string => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${config.title}</title>
<description>${config.description}</description>
<link>${config.domain}</link>
<atom:link href="${config.domain}/api/rss.xml" rel="self" type="application/rss+xml"/>
${posts
	.map(
		(post) => `<item>
<guid isPermaLink="true">${config.domain}/blog/${post.slug}</guid>
<title>${post.title}</title>
<link>${config.domain}/blog/${post.slug}</link>
<description>${post.description}</description>
<pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>
</item>`
	)
	.join('')}
</channel>
</rss>
`;
