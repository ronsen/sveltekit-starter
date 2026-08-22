<script lang="ts">
	import type { Post } from "$lib/../generated/prisma/client";
	import { Pencil } from "@lucide/svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import Alert from "$lib/components/alert.svelte";
	import Delete from "./delete.svelte";

	let { posts }: { posts: Post[] } = $props();
</script>

{#if posts.length == 0}
	<Alert>Empty.</Alert>
{:else}
	<div class="mb-6">
		{#each posts as post, i}
			<div
				class="flex justify-between items-center border-b dark:border-zinc-700 pb-2 mb-2"
			>
				<a href="/{post.id}/{post.slug}" class="block w-full"
					>{post.title}</a
				>
				<div class="inline-flex items-center">
					<a
						href="/{post.id}/edit"
						class={buttonVariants({ variant: "ghost" })}
						><Pencil size={16} /></a
					>
					<Delete title="{post.title}?" action="/{post.id}/delete" />
				</div>
			</div>
		{/each}
	</div>
{/if}
