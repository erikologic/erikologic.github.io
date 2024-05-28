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

<main>
	<article class="prose">
		<h1>{data.meta.title}</h1>
		<p>Published: {data.meta.publishedDate}</p>
		{#if data.meta.image}
			<div class="hero-image">
				<enhanced:img src={data.EnhancedImage} alt={data.meta.image.alt} />
			</div>
		{/if}
		<svelte:component this={data.PostContent} />
	</article>
</main>

<!-- TODO how does it works for article pictures? -->

<!-- svelte-ignore css-unused-selector -->
<style>
	.hero-image img {
		width: 70vw;
		height: auto;
	}
</style>
