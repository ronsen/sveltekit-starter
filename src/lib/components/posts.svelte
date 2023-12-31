<script lang="ts">
    import Alert from "$lib/components/alert.svelte";
    import type { Post } from "@prisma/client";
    import Delete from "./delete.svelte";

    export let posts: Post[];
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
                    <Delete message='Delete this note: {post.title}?' action='/{post.id}/delete' />
                </div>
            </div>
        {/each}
    </div>
{/if}