<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<svelte:head>
    <title>{data.post?.title}</title>
</svelte:head>

<article>
    <div class="flex justify-between items-center border-b border-gray-500 pb-3 mb-3">
        <div class="title font-bold">{data.post?.title}</div>
        <div class="inline-flex gap-3">
            <a href="/{data.post?.id}/edit" title="Edit Note" class="text-gray-500"><i class="bi bi-pencil-square"></i></a>
            <a href="/{data.post?.id}/delete" title="Delete Note" class="text-gray-500"><i class="bi bi-trash"></i></a>
        </div>
    </div>

    {#if data.post?.photo}
        <div class="mb-3">
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
