<script lang="ts">
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<svelte:head>
    <title>{data.post?.title}</title>
</svelte:head>

<article>
  <div class="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
    <div class="title font-bold">{data.post?.title}</div>
    <div class="inline-flex gap-3">
      <a href="/{data.post?.id}/edit" title="Edit Note" class="text-gray-500"><i class="bi bi-pencil-square"></i></a>
      <a href="/{data.post?.id}/delete" title="Delete Note" class="text-gray-500"><i class="bi bi-trash"></i></a>
    </div>
  </div>

  <div class="content prose max-w-none">
    {@html data.post?.contentToHtml}
  </div>
</article>
