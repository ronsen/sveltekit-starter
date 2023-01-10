<script lang="ts">
  import Delete from "$lib/icons/delete.svelte";
  import Edit from "$lib/icons/edit.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

{#if (data.notes.length == 0)}
    <div class="p-3 bg-yellow-50 border border-yellow-100">
        Empty.
    </div>
{/if}

<svelte:head>
    <title>Catatan</title>
</svelte:head>

<div class="notes">
    {#each data.notes as note}
        <div class="note flex justify-between items-baseline border-b border-gray-200 pb-2 mb-2">
            <div class="note-title">
                <a href="/{note.id}/{note.slug}">{ note.title }</a>
            </div>
            <div class="inline-flex gap-3">
                <a href="/{note.id}/edit" class="text-gray-500"><Edit /></a>
                <a href="/{note.id}/delete" class="text-gray-500"><Delete /></a>
            </div>
        </div>
    {/each}
</div>