<script lang="ts">
  import Delete from "$lib/icons/delete.svelte";
  import Edit from "$lib/icons/edit.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  const title = data.note?.title;
  const content = data.note?.content?.replace(/(?:\r\n|\r|\n)/g, "<br>");
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<article>
  <div class="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
    <div class="title font-bold">{title}</div>
    <div class="inline-flex gap-3">
      <a href="/{data.note?.id}/edit" class="text-gray-500"><Edit /></a>
      <a href="/{data.note?.id}/delete" class="text-gray-500"><Delete /></a>
    </div>
  </div>

  <div class="content">
    {@html content}
  </div>
</article>
