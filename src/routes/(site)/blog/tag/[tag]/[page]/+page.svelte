<script>
	import { base } from '$app/paths';

	export let data;
</script>

<div class="prose">
	<h3>Blog entries</h3>
	<ul>
		{#each data.posts as post}
			<li>
				<h2>
					<a href="{base}/blog/post/{post.slug}">
						{post.title}
					</a>
				</h2>
				Published {post.publishedDate}
				<p>{post.description}</p>
				<ul>
					{#each post.tags as tag}
						<li>
							<a href="{base}/blog/tag/{tag}/1">{tag}</a>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>

	{#if data.totalPages > 1}
		<nav>
			{#if data.page > 1}
				<a href="{base}/blog/tag/{data.tags}/{data.page - 1}">Prev</a>
			{/if}

			<!-- TODO at some point this should be capped -->
			<!-- TODO center and higlight the current page -->
			{#each Array.from({ length: data.totalPages }, (_, i) => i + 1) as page}
				<a href="{base}/blog/tag/{data.tags}/{page}">{page}</a>
			{/each}

			{#if data.page < data.totalPages}
				<a href="{base}/blog/tag/{data.tags}/{data.page + 1}">Next</a>
			{/if}
		</nav>
	{/if}
</div>
