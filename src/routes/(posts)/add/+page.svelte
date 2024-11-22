<script lang="ts">
	import { enhance } from "$app/forms";
	import Alert from "$lib/components/alert.svelte";
	import Button from "$lib/components/ui/button.svelte";
	import Input from "$lib/components/ui/input.svelte";
	import Textarea from "$lib/components/ui/textarea.svelte";
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
		<Input type="text" name="title" placeholder="Title" />
	</div>
	<div class="mb-3">
		<input type="file" name="file" accept="image/jpeg" class="w-full" />
	</div>
	<div class="mb-3">
		<Textarea name="content" rows={5} />
	</div>
	<div class="mb-3">
		<Input type="text" name="tagcsv" placeholder="Tags" />
		<div class="mt-1 text-xs">Seperated by comma.</div>
	</div>
	<Button type="submit">Save</Button>
</form>
