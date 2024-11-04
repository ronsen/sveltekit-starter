<script lang="ts">
	import type { ActionData, PageServerData } from "./$types";
	import Alert from "$lib/components/alert.svelte";
	import { enhance } from "$app/forms";

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Edit Post</title>
</svelte:head>

{#if form?.error}
	<Alert>{@html form?.message}</Alert>
{/if}

<form method="post" enctype="multipart/form-data" use:enhance>
	<input type="hidden" name="id" value={data.post?.id} />
	<div class="mb-3">
		<input type="text" name="title" placeholder="Title" value={data.post?.title} class="rounded w-full">
	</div>
	<div class="mb-3">
		<input type="file" name="file" accept="image/jpeg" class="w-full">
	</div>
	<div class="mb-3">
		<textarea name="content" rows="10" placeholder="Content" class="rounded w-full">{data.post?.content}</textarea>
	</div>
	<div class="mb-3">
		<input type="text" name="tagcsv" placeholder="Tags" value={data.post?.tagcsv} class="rounded w-full">
		<div class="mt-1 text-xs">Seperated by comma.</div>
	</div>
	<button type="submit" class="p-2 rounded border">Update</button>
</form>
