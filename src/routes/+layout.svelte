<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  import "../app.css";
</script>

<div class="flex justify-between items-center border-b border-primary pb-2 mb-8">
    <h1 class="font-bold uppercase"><a href="/">Catatan</a></h1>

    <div class="inline-flex gap-3">
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

<footer class="border-t-1 border-neutral py-4 flex justify-center mt-4">
    <form action="/theme" method="post" class="form-control" use:enhance>
        <div class="input-group">
            <select name="theme" class="select select-bordered select-sm">
                <option>Theme</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
            <button type="submit" class="btn btn-sm">Change</button>
        </div>
    </form>
</footer>