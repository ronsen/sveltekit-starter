<script lang="ts">
	import type { PageServerData } from "./$types";
	import Pagination from "$lib/components/pagination.svelte";
	import Posts from "$lib/components/posts.svelte";
	import Search from "$lib/components/search.svelte";

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>Demo</title>
</svelte:head>

<Search q="" />

<Posts posts={data.posts} />

<Pagination href="/?" prevPage={data.prevPage} nextPage={data.nextPage} />
