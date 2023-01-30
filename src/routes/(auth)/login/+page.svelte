<script lang="ts">
    import { enhance } from "$app/forms";
    import Alert from "$lib/components/alert.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

{#if form?.error}
    <Alert>{@html form?.message}</Alert>
{/if}

<div class="w-full md:w-2/3 md:mx-auto">
    <form method="post" use:enhance>
        <div class="mb-3">
            <input type="text" name="username" placeholder="Username" class="w-full p-2 border border-gray-300 rounded">
        </div>
        <div class="mb-3">
            <input type="password" name="password" placeholder="Password"  class="w-full p-2 border border-gray-300 rounded">
        </div>
        <div class="inline-flex items-center gap-3">
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded text-white">Sign In</button>
            <a href="/register">Register</a>
        </div>
    </form>
</div>