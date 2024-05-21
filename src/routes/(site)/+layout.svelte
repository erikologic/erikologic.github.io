<script lang="ts">
	import '../../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

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
</nav> -->

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</nav>
		<!-- --- -->
	</svelte:fragment>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
