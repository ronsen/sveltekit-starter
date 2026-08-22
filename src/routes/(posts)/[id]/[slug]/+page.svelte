<script lang="ts">
	import { Pencil } from "@lucide/svelte";
	import Delete from "$lib/components/delete.svelte";
	import type { Tag } from "$lib/../generated/prisma/client";
	import { Badge } from "$lib/components/ui/badge";
	import { buttonVariants } from "$lib/components/ui/button";

	interface Post {
		id: number;
		title: string;
		photo: string;
		contentToHtml: string;
		tags: Tag[];
	}

	interface PageServerData {
		data: {
			post: Post;
		};
	}

	let { data }: PageServerData = $props();
</script>

<svelte:head>
	<title>{data.post?.title}</title>
</svelte:head>

<article>
	<div
		class="flex justify-between items-center border-b dark:border-zinc-700 pb-3 mb-3"
	>
		<div class="title font-bold">{data.post?.title}</div>
		<div class="inline-flex items-center">
			<a
				href="/{data.post?.id}/edit"
				class={buttonVariants({ variant: "ghost" })}
				><Pencil size={16} /></a
			>
			<Delete title={data.post.title} action="/{data.post?.id}/delete" />
		</div>
	</div>

	{#if data.post?.photo}
		<div class="flex justify-center mb-3">
			<img src={data.post?.photo} alt={data.post?.title} class="w-full" />
		</div>
	{/if}

	<div class="content prose max-w-none mb-3 dark:prose-invert">
		{@html data.post?.contentToHtml}
	</div>

	{#if data.post?.tags}
		<div class="flex justify-center gap-2">
			{#each data.post?.tags as tag}
				<Badge>
					<a href="/tag/{tag.slug}">{tag.name}</a>
				</Badge>
			{/each}
		</div>
	{/if}
</article>
