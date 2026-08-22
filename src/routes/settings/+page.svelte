<script lang="ts">
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import Alert from "$lib/components/alert.svelte";

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
			placeholder="Password"
			class="input"
		/>
	</div>
	<Button type="submit" class="btn">Change Password</Button>
</form>
