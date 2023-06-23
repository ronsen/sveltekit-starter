<script lang="ts">
    import type { PageServerData } from "./$types";
    import { enhance } from "$app/forms";
    
    export let data: PageServerData;
</script>

<svelte:head>
    <title>Delete Note</title>
</svelte:head>
  
<article>
    <div class="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
        <div class="title font-bold">{data.post?.title}</div>
    </div>

    <form method="post" use:enhance>
        <button type="submit" class="btn btn-error">Delete</button>
    </form>
</article>
  