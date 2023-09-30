<script lang="ts">
    import type { PageServerData } from "./$types";
    import { enhance } from "$app/forms";

    export let data: PageServerData;

    let dialog: HTMLDialogElement;
</script>

<svelte:head>
    <title>{data.post?.title}</title>
</svelte:head>

<article>
    <div class="flex justify-between items-center border-b border-base-300 pb-3 mb-3">
        <div class="title font-bold">{data.post?.title}</div>
        <div class="inline-flex gap-3">
            <a href="/{data.post?.id}/edit" title="Edit Note" class="text-gray-500"><i class="bi bi-pencil-square"></i></a>
            <button title="Delete Note" class="text-gray-500" on:click={() => dialog.show()}><i class="bi bi-trash"></i></button>
        </div>
    </div>

    {#if data.post?.photo}
        <div class="flex justify-center mb-3">
            <img src="/images/{data.post?.photo}" alt="{data.post?.title}">
        </div>       
    {/if}

    <div class="content prose max-w-none mb-3">
        {@html data.post?.contentToHtml}
    </div>

    {#if data.post?.tags}
        <div class="flex justify-center gap-3">
            {#each data.post?.tags as tag}
                <div class="badge badge-ghost">
                    <a href="/tag/{tag.slug}">{tag.name}</a>
                </div>
            {/each}
        </div>
    {/if}
</article>

<dialog bind:this={dialog} class="modal">
    <form action="/{data.post?.id}/delete" method="post" class="modal-box" use:enhance>
        <h3 class="font-bold text-lg">Confirm</h3>
        <p class="py-4">Delete this note?</p>
        <div class="modal-action">
            <button type="submit" class="btn btn-error btn-sm">Yes</button>
            <button class="btn btn-neutral btn-sm" on:click|preventDefault={() => dialog.close()}>No</button>
        </div>
    </form>
</dialog>