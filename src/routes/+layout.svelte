<script lang="ts">
	import { base } from '$app/paths';
</script>

<nav>
	<a href="{base}/">Home</a>
	<a href="{base}/whoami">Whoami</a>
	<a href="{base}/blog">Blog</a>
</nav>

<slot></slot>
