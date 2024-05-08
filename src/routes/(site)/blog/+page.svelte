<script>
	export let data;
</script>

<h1>Blog</h1>

<ul>
	{#each data.posts as post}
		<li>
			<h2>
				<a href="/blog/{post.slug}">
					{post.title}
				</a>
			</h2>
			Published {post.date}
		</li>
	{/each}
</ul>

<h2>Total posts: {data.totalPosts.total}</h2>
