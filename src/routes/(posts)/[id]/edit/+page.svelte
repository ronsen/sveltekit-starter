<script lang="ts">
    import type { ActionData, PageServerData } from "./$types";
    import Alert from "$lib/components/alert.svelte";
  
    export let data: PageServerData;
    export let form: ActionData;
</script>

<svelte:head>
    <title>Edit Note</title>
</svelte:head>

{#if form?.error}
    <Alert>{@html form?.message}</Alert>
{/if}

<form method="post">
    <input type="hidden" name="id" value="{data.post?.id}">
    <div class="mb-3">
        <input type="text" name="title" placeholder="Title" value="{data.post?.title}" class="w-full p-2 border border-gray-300 rounded">
    </div>
    <div class="mb-3">
        <textarea name="content" rows="10" class="w-full p-2 border border-gray-300 rounded">{data.post?.content}</textarea>
    </div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded text-white">Update</button>
</form>