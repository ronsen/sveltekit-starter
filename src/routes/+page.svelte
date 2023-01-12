<script lang="ts">
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
      <a href="/?page={data.prevPage}" class="border border-gray-200 p-2 text-gray-700 hover:text-gray-900"><i class="bi bi-arrow-left"></i></a>
  {/if}

  {#if (data.nextPage > 0)}
      <a href="/?page={data.nextPage}" class="border border-gray-200 p-2 text-gray-500 hover:text-gray-900"><i class="bi bi-arrow-right"></i></a>
  {/if}
</div>