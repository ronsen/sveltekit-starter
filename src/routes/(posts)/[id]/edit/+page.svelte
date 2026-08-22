<script lang="ts">
	import type { ActionData, PageServerData } from "./$types";
	import { enhance } from "$app/forms";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";
	import Alert from "$lib/components/alert.svelte";

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
		<Input
			type="text"
			name="title"
			placeholder="Title"
			value={data.post?.title}
			class="input"
		/>
	</div>
	<div class="mb-3">
		<Input type="file" name="file" accept="image/jpeg" />
	</div>
	<div class="mb-3">
		<Textarea name="content" value={data.post?.content} />
	</div>
	<div class="mb-3">
		<Input
			type="text"
			name="tagcsv"
			placeholder="Tags"
			value={data.post?.tagcsv.toString()}
			class="input"
		/>
		<div class="mt-1 text-xs">Seperated by comma.</div>
	</div>
	<Button type="submit" class="btn">Update</Button>
</form>
