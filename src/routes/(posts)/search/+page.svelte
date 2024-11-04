<script lang="ts">
	import type { PageServerData } from "./$types";
	import Navigation from "$lib/components/navigation.svelte";
	import Posts from "$lib/components/posts.svelte";
	import Search from "$lib/components/search.svelte";

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>{data.q}</title>
</svelte:head>

<Search q={data.q} />

<Posts posts={data.posts} />

<Navigation href="/search?q={data.q}&" prevPage={data.prevPage} nextPage={data.nextPage} />
