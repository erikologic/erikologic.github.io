<script>
	export let data;
</script>

<article>
	<h1>{data.meta.title}</h1>
	<p>Published: {data.meta.date}</p>
	<svelte:component this={data.PostContent} />
</article>
