<script>
	export let data;
</script>

<svelte:head>
	<meta property="article:section" content={data.meta.tags[0]} />
	<meta property="article:tag" content={data.meta.tags.join(',')} />
	<!-- TODO check date format -->
	<meta property="article:published_time" content={data.meta.publishedDate} />
	<meta property="article:modified_time" content={data.meta.modifiedDate} />
</svelte:head>

<article>
	<h1>{data.meta.title}</h1>
	<p>Published: {data.meta.publishedDate}</p>
	<svelte:component this={data.PostContent} />
</article>
