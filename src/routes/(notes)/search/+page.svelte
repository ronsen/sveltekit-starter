<script lang="ts">
    import Navigation from "$lib/components/navigation.svelte";
    import Notes from "$lib/components/notes.svelte";
    import Search from "$lib/components/search.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<svelte:head>
    <title>{data.q}</title>
</svelte:head>

<Search q={data.q} />

<Notes notes={data.notes} />

<Navigation href="/search?q={data.q}&" prevPage={data.prevPage} nextPage={data.nextPage} />