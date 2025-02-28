<script lang="ts">
	import type { PageServerData } from "./$types";
	import { Pencil } from "lucide-svelte";
	import Delete from "$lib/components/delete.svelte";

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>{data.post?.title}</title>
</svelte:head>

<article>
	<div class="flex justify-between items-center border-b dark:border-zinc-700 pb-3 mb-3">
		<div class="title font-bold">{data.post?.title}</div>
		<div class="inline-flex gap-3">
			<a href="/{data.post?.id}/edit" title="Edit"><Pencil size={16} /></a>
			<Delete message="Delete this post?" action="/{data.post?.id}/delete" />
		</div>
	</div>

	{#if data.post?.photo}
		<div class="flex justify-center mb-3">
			<img src="/images/{data.post?.photo}" alt={data.post?.title} />
		</div>
	{/if}

	<div class="content prose max-w-none mb-3 dark:prose-invert">
		{@html data.post?.contentToHtml}
	</div>

	{#if data.post?.tags}
		<div class="flex justify-center gap-2">
			{#each data.post?.tags as tag}
				<div class="bg-zinc-200 dark:bg-zinc-700 rounded-sm px-2 py-1 text-sm">
					<a href="/tag/{tag.slug}">{tag.name}</a>
				</div>
			{/each}
		</div>
	{/if}
</article>
