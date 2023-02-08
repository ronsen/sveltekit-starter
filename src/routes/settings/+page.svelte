<script lang="ts">
    import { enhance } from "$app/forms";
    import Alert from "$lib/components/alert.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<svelte:head>
    <title>Settings</title>
</svelte:head>

{#if form?.error}
    <Alert>{@html form?.message}</Alert>
{/if}

<div class="w-full md:w-2/3 md:mx-auto">
    <form method="post" use:enhance>
        <div class="mb-3">
            <input type="password" name="password" placeholder="Password"  class="input input-bordered w-full">
        </div>
        <div class="inline-flex items-center gap-3">
            <button type="submit" class="btn btn-primary">Change Password</button>
        </div>
    </form>
</div>