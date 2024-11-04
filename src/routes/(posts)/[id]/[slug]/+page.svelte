<script lang="ts">
	import type { PageServerData } from "./$types";
	import Delete from "$lib/components/delete.svelte";

	import Fa from "svelte-fa";
	import { faPencil } from "@fortawesome/free-solid-svg-icons";

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{data.post?.title}</title>
</svelte:head>

<article>
	<div class="flex justify-between items-center border-b pb-3 mb-3">
		<div class="title font-bold">{data.post?.title}</div>
		<div class="inline-flex gap-3">
			<a href="/{data.post?.id}/edit" title="Edit"><Fa icon={faPencil} /></a>
			<Delete message="Delete this post?" action="/{data.post?.id}/delete" />
		</div>
	</div>

	{#if data.post?.photo}
		<div class="flex justify-center mb-3">
			<img src="/images/{data.post?.photo}" alt={data.post?.title} />
		</div>
	{/if}

	<div class="content prose max-w-none mb-3">
		{@html data.post?.contentToHtml}
	</div>

	{#if data.post?.tags}
		<div class="flex justify-center gap-2">
			{#each data.post?.tags as tag}
				<div class="bg-zinc-100 rounded px-2 py-1 text-sm">
					<a href="/tag/{tag.slug}">{tag.name}</a>
				</div>
			{/each}
		</div>
	{/if}
</article>
