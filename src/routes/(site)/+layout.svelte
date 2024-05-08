<script lang="ts">
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';

	export let data;
	console.log(data.currentRoute);
</script>

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
