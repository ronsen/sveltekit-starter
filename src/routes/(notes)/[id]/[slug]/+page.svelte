<script lang="ts">
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
      <a href="/{data.note?.id}/edit" title="Edit Note" class="text-gray-500"><i class="bi bi-pencil-square"></i></a>
      <a href="/{data.note?.id}/delete" title="Delete Note" class="text-gray-500"><i class="bi bi-trash"></i></a>
    </div>
  </div>

  <div class="content">
    {@html content}
  </div>
</article>
