<script>
	import { base } from '$app/paths';

	export let data;
</script>

<h1>Categories</h1>

<ul>
	{#each data.uniqueCategories as category}
		<li>
			<h2>
				<a href="{base}/blog/category/{category.title}">
					{category.title}
				</a>: {category.count}
			</h2>
		</li>
	{/each}
</ul>
