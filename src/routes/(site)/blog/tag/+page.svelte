<script>
	import { base } from '$app/paths';

	export let data;
</script>

<ul>
	{#each data.tags as { tag, count }}
		<ul>
			<li>
				<a href="{base}/blog/tag/{tag}">{tag}</a>: {count}
			</li>
		</ul>
	{/each}
</ul>
