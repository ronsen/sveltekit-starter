<script lang="ts">
    import Alert from "$lib/components/alert.svelte";

    export let form: any;
</script>

<svelte:head>
    <title>Add New Note</title>
</svelte:head>

{#if form?.error}
    <Alert>{@html form?.message}</Alert>
{/if}

<form method="POST">
    <div class="mb-3">
        <input type="text" name="title" placeholder="Title" class="w-full p-2 border border-gray-300 rounded">
    </div>
    <div class="mb-3">
        <textarea name="content" rows="5" class="w-full p-2 border border-gray-300 rounded"></textarea>
    </div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded text-white">Save</button>
</form>