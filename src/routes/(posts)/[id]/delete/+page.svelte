<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<svelte:head>
    <title>Delete Note</title>
</svelte:head>
  
<article>
  <div class="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
    <div class="title font-bold">{data.post?.title}</div>
  </div>

  <form method="post">
      <button type="submit" class="bg-red-500 hover:bg-red-600 px-6 py-1 rounded text-white">Delete</button>
  </form>
</article>
  