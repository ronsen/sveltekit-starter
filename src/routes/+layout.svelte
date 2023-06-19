<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "./$types";
    import { page } from "$app/stores";

    import "../app.css";

    const updateTheme: SubmitFunction = ({ action }) => {
        const theme = action.searchParams.get('theme');

        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
</script>

<div class="flex justify-between items-center border-b border-primary pb-2 mb-8">
    <h1 class="font-bold uppercase"><a href="/">Catatan</a></h1>

    <div class="inline-flex items-center gap-3">
        <form method="post" class="form-control" use:enhance={updateTheme}>
            <div class="dropdown dropdown-end">
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0" class="btn btn-sm btn-ghost rounded-btn"><i class="bi bi-sun"></i></label>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <li><button formaction="/?theme=light&redirectTo={$page.url.pathname}">Light</button></li> 
                    <li><button formaction="/?theme=dark&redirectTo={$page.url.pathname}">Dark</button></li> 
                </ul>
            </div>
        </form>
        
        {#if $page.data.user}
            <a href="/add" title="Add New Note"><i class="bi bi-plus-circle"></i></a>
            <a href="/settings" title="Settings"><i class="bi bi-gear"></i></a>
        {/if}

        {#if !$page.data.user}
            <a href="/login" title="Sign In"><i class="bi bi-box-arrow-in-right"></i></a>
        {:else}
            <form method="POST" action="/logout">
                <button type="submit" title="Sign Out"><i class="bi bi-box-arrow-right"></i></button>
            </form>
        {/if}
    </div>
</div>

<slot />