<script lang="ts">
  import Delete from "../components/delete.svelte";
  import Edit from "../components/edit.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

{#if (data.notes.length == 0)}
    <div class="p-3 bg-yellow-50 border border-yellow-100">
        Empty.
    </div>
{/if}

<div class="notes">
    {#each data.notes as note}
        <div class="note flex justify-between items-baseline border-b border-gray-200 pb-2 mb-2">
            <div class="note-title">
                <a href="/{note.id}">{ note.title }</a>
            </div>
            <div class="inline-flex gap-3">
                <a href="/{note.id}/edit" class="text-gray-500"><Edit /></a>
                <a href="/{note.id}/delete" class="text-gray-500"><Delete /></a>
            </div>
        </div>
    {/each}
</div>