<script lang="ts">
    import { base } from '$app/paths';
    console.log({base});
</script>
 
<nav>
    <a href="{base}/">Home</a>
    <a href="{base}/about">About</a>
</nav>

<slot></slot>


