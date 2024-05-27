<script>
	import { base } from '$app/paths';

	export let data;
</script>

<div class="prose">
	<h3>Some raw tags count</h3>
	<ul>
		{#each data.tags as { tag, count }}
			<ul>
				<li>
					<a href="{base}/blog/tag/{tag}">{tag}</a>: {count}
				</li>
			</ul>
		{/each}
	</ul>
</div>
