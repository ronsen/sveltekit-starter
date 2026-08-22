<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import Alert from "$lib/components/alert.svelte";

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
		<Input type="text" name="title" placeholder="Title" class="input" />
	</div>
	<div class="mb-3">
		<Input type="file" name="file" accept="image/jpeg" class="w-full" />
	</div>
	<div class="mb-3">
		<Textarea name="content" />
	</div>
	<div class="mb-3">
		<Input type="text" name="tagcsv" placeholder="Tags" class="input" />
		<div class="mt-1 text-xs">Seperated by comma.</div>
	</div>
	<Button type="submit" class="btn">Save</Button>
</form>
