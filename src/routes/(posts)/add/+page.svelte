<script lang="ts">
    import { enhance } from "$app/forms";
    import Alert from "$lib/components/alert.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<svelte:head>
    <title>Add New Note</title>
</svelte:head>

{#if form?.error}
    <Alert>{@html form?.message}</Alert>
{/if}

<form method="post" use:enhance>
    <div class="mb-3">
        <input type="text" name="title" placeholder="Title" class="input input-bordered w-full">
    </div>
    <div class="mb-3">
        <textarea name="content" rows="5" placeholder="Content" class="textarea textarea-bordered w-full"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
</form>