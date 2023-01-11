<script lang="ts">
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