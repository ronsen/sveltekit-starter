<script lang="ts">
	import type { PageServerData } from "./$types";
	import Navigation from "$lib/components/navigation.svelte";
	import Posts from "$lib/components/posts.svelte";

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>{data.tag?.name}</title>
</svelte:head>

<div class="flex justify-between items-center border-b pb-2 mb-3">
	<div class="title font-bold uppercase">{data.tag?.name}</div>
</div>

<Posts posts={data.posts} />

<Navigation href="/tag/{data.tag?.slug}?" prevPage={data.prevPage} nextPage={data.nextPage} />
