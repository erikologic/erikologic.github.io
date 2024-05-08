<script>
	import { base } from '$app/paths';
	
	export let data;
</script>

<h1>Page {data.page}</h1>

<ul>
	{#each data.posts as post}
		<li>
			<h2>
				<a href="{base}/blog/{post.slug}">
					{post.title}
				</a>
			</h2>
			Published {post.date}
		</li>
	{/each}
</ul>

<h2>Total posts: {data.totalPosts}</h2>
