<script lang="ts">
  import ArrowLeft from "$lib/icons/arrow-left.svelte";
  import ArrowRight from "$lib/icons/arrow-right.svelte";
  import Notes from "$lib/components/notes.svelte";
  import Search from "$lib/components/search.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<svelte:head>
    <title>Catatan</title>
</svelte:head>

<Search />

<Notes notes={data.notes} />

<div class="flex justify-center gap-3">
  {#if (data.prevPage > 0)}
      <a href="/?page={data.prevPage}"><ArrowLeft /></a>
  {/if}

  {#if (data.nextPage > 0)}
      <a href="/?page={data.nextPage}"><ArrowRight /></a>
  {/if}
</div>