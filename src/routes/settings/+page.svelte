<script lang="ts">
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
	import Alert from "$lib/components/alert.svelte";
	import Input from "$lib/components/ui/input.svelte";
	import Button from "$lib/components/ui/button.svelte";

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

{#if form?.error}
	<Alert>{@html form?.message}</Alert>
{/if}

<form method="post" use:enhance>
	<div class="mb-3">
		<Input
			type="password"
			name="password"
			value=""
			placeholder="Password"
		/>
	</div>
	<div class="inline-flex items-center gap-3">
		<Button type="submit">Change Password</Button>
	</div>
</form>
