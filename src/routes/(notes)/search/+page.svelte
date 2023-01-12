<script lang="ts">
    import ArrowLeft from "$lib/icons/arrow-left.svelte";
    import ArrowRight from "$lib/icons/arrow-right.svelte";
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

<div class="flex justify-center gap-3">
    {#if (data.prevPage > 0)}
        <a href="/search?q={data.q}&page={data.prevPage}"><ArrowLeft /></a>
    {/if}

    {#if (data.nextPage > 0)}
        <a href="/search?q={data.q}&page={data.nextPage}"><ArrowRight /></a>
    {/if}
</div>