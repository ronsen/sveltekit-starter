<script>
  import { page } from "$app/stores";

  import "../app.css";
</script>

<div class="flex justify-between items-center border-b border-gray-600 pb-2 mb-8">
    <h1 class="font-bold uppercase"><a href="/">Catatan</a></h1>

    <div class="inline-flex gap-3">
        {#if $page.data.user}
            <a href="/add" title="Add New Note"><i class="bi bi-plus-circle"></i></a>
            <a href="/settings" title="Settings"><i class="bi bi-gear"></i></a>
        {/if}

        {#if !$page.data.user}
            <a href="/login" title="Sign In"><i class="bi bi-box-arrow-in-right"></i></a>
        {:else}
            <form  method="POST" action="/logout">
                <button type="submit" title="Sign Out"><i class="bi bi-box-arrow-right"></i></button>
            </form>
        {/if}
    </div>
</div>

<slot />
