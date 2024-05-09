<script>
	import config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} - {config.title}</title>
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<h1>{data.meta.title}</h1>
	<p>Published: {data.meta.date}</p>
	<svelte:component this={data.PostContent} />
</article>
