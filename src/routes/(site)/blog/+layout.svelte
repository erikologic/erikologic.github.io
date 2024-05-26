<script>
	import { base } from '$app/paths';

	export let data;
</script>

<!-- TODO Breadcrumbs -->
<!-- <h1>Blog -> Tag: ALL -> Page 1</h1> -->

<aside>
	<h2>Most recent posts</h2>
	<ul>
		{#each data.recentPosts as post}
			<li>
				<a href="{base}/blog/post/{post.slug}">{post.title}</a>
			</li>
		{/each}
	</ul>
	<h2><a href="{base}/blog/tag">Tags</a></h2>
	<ul>
		{#each data.tags as tag}
			<li>
				<a href="{base}/blog/tag/{tag}/1">{tag}</a>
			</li>
		{/each}
	</ul>
</aside>

<slot />
