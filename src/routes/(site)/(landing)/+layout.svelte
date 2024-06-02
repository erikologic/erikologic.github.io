<script lang="ts">
	import { fade } from 'svelte/transition';

	export let data;
</script>

{#key data.currentRoute}
	<main class="prose flex-1 px-8" in:fade={{ duration: 75, delay: 75 }} out:fade={{ duration: 75 }}>
		<slot />
	</main>
{/key}
