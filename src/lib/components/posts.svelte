<script lang="ts">
    import Alert from "$lib/components/alert.svelte";
    import { enhance } from "$app/forms";
    import type { Post } from "@prisma/client";

    export let posts: Post[];

    let dialog: HTMLDialogElement;
    let action: string = '';

    const destroy = (post: Post) => {
        action = '/' + post.id + '/delete';
        dialog.show();
    };
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
                    <button title="Delete Note" class="text-gray-500" on:click={() => destroy(post)}><i class="bi bi-trash"></i></button>
                </div>
            </div>
        {/each}
    </div>
{/if}

<dialog bind:this={dialog} class="modal">
    <form {action} method="post" class="modal-box" on:submit|preventDefault={() => dialog.close()} use:enhance>
        <h3 class="font-bold text-lg">Confirm</h3>
        <p class="py-4">Delete this note?</p>
        <div class="modal-action">
            <button type="submit" class="btn btn-error btn-sm">Yes</button>
            <button class="btn btn-neutral btn-sm" on:click|preventDefault={() => dialog.close()}>No</button>
        </div>
    </form>
</dialog>