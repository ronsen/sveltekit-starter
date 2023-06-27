<script lang="ts">
    import Alert from "$lib/components/alert.svelte";

    export let posts: any;
</script>

{#if (posts.length == 0)}
    <Alert>Empty.</Alert>
{:else}
    <div class="notes mb-6">
        {#each posts as post}
            <div class="note flex justify-between items-baseline border-b border-base-300 pb-2 mb-2">
                <div class="note-title">
                    <a href="/{post.id}/{post.slug}">{post.title}</a>
                </div>
                <div class="inline-flex gap-3">
                    <a href="/{post.id}/edit" title="Edit Note" class="text-gray-500"><i class="bi bi-pencil-square"></i></a>
                    <a href="/{post.id}/delete" title="Delete Note" class="text-gray-500"><i class="bi bi-trash"></i></a>
                </div>
            </div>
        {/each}
    </div>
{/if}