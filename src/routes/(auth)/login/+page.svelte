<script lang="ts">
	import { enhance } from "$app/forms";
	import Alert from "$lib/components/alert.svelte";
	import Button from "$lib/components/ui/button.svelte";
	import Input from "$lib/components/ui/input.svelte";
	import type { ActionData } from "./$types";

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

{#if form?.error}
	<Alert>{@html form?.message}</Alert>
{/if}

<form method="post" use:enhance>
	<div class="mb-3">
		<Input type="text" name="username" placeholder="Username" />
	</div>
	<div class="mb-3">
		<Input
			type="password"
			name="password"
			placeholder="Password"
		/>
	</div>
	<div class="inline-flex items-center gap-3">
		<Button type="submit">Sign In</Button>
		<a href="/register">Register</a>
	</div>
</form>
