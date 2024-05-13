<script>
	import { base } from '$app/paths';

	export let data;
</script>

<ul>
	{#each data.tags as tag}
		<ul>
			<li>
				<a href="{base}/blog2/tags/{tag}/1">{tag}</a>
			</li>
		</ul>
	{/each}
</ul>
