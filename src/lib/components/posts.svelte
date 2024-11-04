<script lang="ts">
	import type { Post } from "@prisma/client";
	import Alert from "$lib/components/alert.svelte";
	import Delete from "./delete.svelte";

	import Fa from "svelte-fa";
	import { faPencil } from "@fortawesome/free-solid-svg-icons";

	let { posts }: { posts: Post[] } = $props();
</script>

{#if posts.length == 0}
	<Alert>Empty.</Alert>
{:else}
	<div class="notes mb-6">
		{#each posts as post}
			<div class="note flex justify-between items-baseline border-b pb-2 mb-2">
				<div class="note-title">
					<a href="/{post.id}/{post.slug}">{post.title}</a>
				</div>
				<div class="inline-flex gap-3">
					<a href="/{post.id}/edit" title="Edit"><Fa icon={faPencil} /></a>
					<Delete message="Delete: {post.title}?" action="/{post.id}/delete" />
				</div>
			</div>
		{/each}
	</div>
{/if}
