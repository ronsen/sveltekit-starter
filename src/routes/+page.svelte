<script lang="ts">
    import Navigation from "$lib/components/navigation.svelte";
    import Posts from "$lib/components/posts.svelte";
    import Search from "$lib/components/search.svelte";

    export let data;
</script>

<svelte:head>
    <title>Catatan</title>
</svelte:head>

<Search />

<Posts posts={data.posts} />

<Navigation href="/?" prevPage={data.prevPage} nextPage={data.nextPage} />