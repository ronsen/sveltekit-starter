<script lang="ts">
    import type { PageServerData } from "./$types";
  
    export let data: PageServerData;
</script>

<svelte:head>
    <title>Edit Note</title>
</svelte:head>

<form method="post">
    <input type="hidden" name="id" value="{data.note?.id}">
    <div class="mb-3">
        <input type="text" name="title" placeholder="Title" value="{data.note?.title}" class="w-full p-2 border border-gray-300 rounded" required>
    </div>
    <div class="mb-3">
        <textarea name="content" rows="10" class="w-full p-2 border border-gray-300 rounded">{data.note?.content}</textarea>
    </div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded text-white">Update</button>
</form>