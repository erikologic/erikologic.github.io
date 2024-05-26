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

<!-- <div class="min-h-screen flex flex-col">
	<header class="bg-red-50">Header</header>

	<div class="flex-1 flex flex-col sm:flex-row">
		<main class="flex-1 bg-indigo-100">Main</main>

		<nav class="order-first sm:w-32 bg-purple-200">Nav Sidebar</nav>

		<aside class="sm:w-32 bg-yellow-100">Aside sidebar</aside>
	</div>

	<footer class="bg-gray-100">Footer</footer>
</div> -->
