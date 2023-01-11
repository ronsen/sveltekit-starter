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