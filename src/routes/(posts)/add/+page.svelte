<script lang="ts">
	import { enhance } from "$app/forms";
	import Alert from "$lib/components/alert.svelte";
	import type { ActionData } from "./$types";

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Add New Post</title>
</svelte:head>

{#if form?.error}
	<Alert>{@html form?.message}</Alert>
{/if}

<form method="post" enctype="multipart/form-data" use:enhance>
	<div class="mb-3">
		<input type="text" name="title" placeholder="Title" class="rounded w-full">
	</div>
	<div class="mb-3">
		<input type="file" name="file" accept="image/jpeg" class="w-full">
	</div>
	<div class="mb-3">
		<textarea name="content" rows="5" placeholder="Content" class="rounded w-full"></textarea>
	</div>
	<div class="mb-3">
		<input type="text" name="tagcsv" placeholder="Tags" class="rounded w-full">
		<div class="mt-1 text-xs">Seperated by comma.</div>
	</div>
	<button type="submit" class="p-2 rounded border">Save</button>
</form>
