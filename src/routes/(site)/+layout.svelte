<script lang="ts">
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	import config from '$lib/config';

	import '../../app.css';

	export let data;
</script>

<svelte:head>
	<title>{$page.data.meta.title} - {config.title}</title>
	<meta data-key="description" name="description" content={$page.data.meta.description} />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="UTF-8" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="og:url" content={$page.url.toString()} />
	<meta property="og:site_name" content={config.title} />
	<meta property="og:title" content={`${$page.data.meta.title} - ${config.title}`} />
	<meta property="twitter:title" content={$page.data.meta.title} />
	<meta property="og:description" content={$page.data.meta.description} />
	<meta property="twitter:description" content={$page.data.meta.description} />
	<meta property="og:type" content={$page.data.meta.type || 'website'} />

	{#if $page.data.meta.image}
		<meta property="og:image" content={$page.data.meta.image.url} />
		<meta property="og:image:secure_url" content={$page.data.meta.image.url} />
		<meta property="twitter:image" content={$page.data.meta.image.url} />
		<meta property="og:image:width" content={$page.data.meta.image.width} />
		<meta property="og:image:height" content={$page.data.meta.image.height} />
	{/if}

	{#if config.twitterHandle}
		<meta property="twitter:site" content={config.twitterHandle} />
	{/if}
</svelte:head>

<nav class="mb-4">
	<ul class="flex justify-center">
		<li class="px-3 py-1 transition hover:scale-105 hover:text-teal-500">
			<a href="{base}/">Home</a>
		</li>
		<li class="px-3 py-1 transition hover:scale-105 hover:text-teal-500">
			<a href="{base}/whoami">Whoami</a>
		</li>
		<li class="px-3 py-1 transition hover:scale-105 hover:text-teal-500">
			<a href="{base}/blog">Blog</a>
		</li>
		<li class="px-3 py-1 transition hover:scale-105 hover:text-teal-500">
			<a href="{base}/api/rss.xml">RSS</a>
		</li>
	</ul>
</nav>

{#key data.currentRoute}
	<main class="flex-1" in:fade={{ duration: 75, delay: 75 }} out:fade={{ duration: 75 }}>
		<slot />
	</main>
{/key}
