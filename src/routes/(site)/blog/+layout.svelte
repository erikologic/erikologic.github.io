<script>
	import { base } from '$app/paths';

	export let data;
</script>

<!-- TODO Breadcrumbs -->
<!-- <h1>Blog -> Tag: ALL -> Page 1</h1> -->

<div class="flex pb-8">
	<aside class="prose mb-12 hidden w-72 px-8 lg:[display:unset]">
		<h2>Most recent posts</h2>
		<ul>
			{#each data.recentPosts as post}
				<li>
					<a href="{base}/blog/post/{post.slug}">{post.title}</a>
				</li>
			{/each}
		</ul>
		<h3><a href="{base}/blog/tag">Tags</a></h3>
		<ul>
			{#each data.tags as tag}
				<li>
					<a href="{base}/blog/tag/{tag}/1">{tag}</a>
				</li>
			{/each}
		</ul>
	</aside>

	<main class="prose px-8">
		<slot />
	</main>
</div>
