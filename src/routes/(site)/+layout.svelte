<script lang="ts">
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	import config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{$page.data.meta.title} - {config.title}</title>
	<meta property="og:title" content={$page.data.meta.title} />
</svelte:head>

<nav>
	<a href="{base}/">Home</a>
	<a href="{base}/whoami">Whoami</a>
	<a href="{base}/blog">Blog</a>
</nav>

{#key data.currentRoute}
	<main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
		<slot />
	</main>
{/key}
