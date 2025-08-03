<script lang="ts">
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
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
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="input"
		/>
	</div>
	<div class="inline-flex items-center gap-3">
		<button type="submit" class="btn">Change Password</button>
	</div>
</form>
