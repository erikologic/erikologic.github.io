<script>
	import config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<meta property="article:section" content={data.meta.categories[0]} />
	<meta property="article:tag" content={data.meta.categories.join(',')} />
<!-- 
	<meta property="article:published_time" content={data.meta.publishedTime} />
	<meta property="article:modified_time" content={data.meta.modifiedTime} /> 
-->
</svelte:head>

<article>
	<h1>{data.meta.title}</h1>
	<p>Published: {data.meta.date}</p>
	<svelte:component this={data.PostContent} />
</article>
