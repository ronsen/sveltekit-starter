<script lang="ts">
	import type { Post } from "@prisma/client";
	import { Pencil } from "lucide-svelte";
	import Alert from "$lib/components/alert.svelte";
	import Delete from "./delete.svelte";

	let { posts }: { posts: Post[] } = $props();
</script>

{#if posts.length == 0}
	<Alert>Empty.</Alert>
{:else}
	<div class="mb-6">
		{#each posts as post}
			<div class="flex justify-between items-baseline border-b dark:border-zinc-700 pb-2 mb-2">
				<a href="/{post.id}/{post.slug}" class="block w-full">{post.title}</a>
				<div class="inline-flex gap-3">
					<a href="/{post.id}/edit" title="Edit"
						><Pencil size={16} /></a
					>
					<Delete
						message="{post.title}?"
						action="/{post.id}/delete"
					/>
				</div>
			</div>
		{/each}
	</div>
{/if}
