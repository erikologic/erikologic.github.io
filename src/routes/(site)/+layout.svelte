<script lang="ts">
	import '../../app.css';
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	import config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{$page.data.meta.title} - {config.title}</title>
	<meta data-key="description" name="description" content={$page.data.meta.description} />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="UTF-8" />
	<meta property="twitter:card" content="summary_large_image" />
	<!-- TODO  $page.url === http://sveltekit-prerender/... -->
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

<!-- <nav>
	<a href="{base}/">Home</a>
	<a href="{base}/whoami">Whoami</a>
	<a href="{base}/blog">Blog</a>
	<a href="{base}/api/rss.xml">RSS</a>
</nav>

{#key data.currentRoute}
	<main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
		<slot />
	</main>
{/key} -->

<div class="min-h-screen flex flex-col">
	<header class="bg-red-400">
		<nav class="navbar bg-base-100 flex justify-center">
			<a class="btn btn-ghost text-xl" href="{base}/">Home</a>
			<a class="btn btn-ghost text-xl" href="{base}/whoami">Whoami</a>
			<a class="btn btn-ghost text-xl" href="{base}/blog">Blog</a>
		</nav>
	</header>

	<slot />

	<!-- TODO RSS is only relevant for the blog -->
	<!-- <footer class="">
		<a href="{base}/api/rss.xml">RSS</a>
	</footer> -->
</div>
