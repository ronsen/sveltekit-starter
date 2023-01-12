<script lang="ts">
    import Delete from "$lib/icons/delete.svelte";
    import Edit from "$lib/icons/edit.svelte";
    import Alert from "$lib/components/alert.svelte";

    export let notes: any;
</script>

{#if (notes.length == 0)}
    <Alert>Empty.</Alert>
{:else}
    <div class="notes mb-6">
        {#each notes as note}
            <div class="note flex justify-between items-baseline border-b border-gray-200 pb-2 mb-2">
                <div class="note-title">
                    <a href="/{note.id}/{note.slug}">{note.title}</a>
                </div>
                <div class="inline-flex gap-3">
                    <a href="/{note.id}/edit" class="text-gray-500"><Edit /></a>
                    <a href="/{note.id}/delete" class="text-gray-500"><Delete /></a>
                </div>
            </div>
        {/each}
    </div>
{/if}