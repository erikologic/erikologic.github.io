<script>
	import { base } from '$app/paths';

	export let data;
</script>

<ul>
	{#each data.posts as post}
		<li>
			<h2>
				<a href="{base}/blog2/post/{post.slug}">
					{post.title}
				</a>
			</h2>
			Published {post.publishedTime}
			<p>{post.description}</p>
			<ul>
				{#each post.tags as tag}
					<li>
						<a href="{base}/blog2/tag/{tag}/1">{tag}</a>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

{#if data.totalPages > 1}
	<nav>
		{#if data.page > 1}
			<a href="{base}/blog2/tag/{data.tags}/{data.page - 1}">Prev</a>
		{/if}

		<!-- TODO at some point this should be capped -->
		{#each Array.from({ length: data.totalPages }, (_, i) => i + 1) as page}
			<a href="{base}/blog2/tag/{data.tags}/{page}">{page}</a>
		{/each}

		{#if data.page < data.totalPages}
			<a href="{base}/blog2/tag/{data.tags}/{data.page + 1}">Next</a>
		{/if}
	</nav>
{/if}
