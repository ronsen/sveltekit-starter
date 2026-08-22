<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import Alert from "$lib/components/alert.svelte";

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

{#if form?.error}
	<Alert>
		{@html form?.message}
	</Alert>
{/if}

<form method="post" use:enhance>
	<div class="mb-3">
		<Input
			type="text"
			name="username"
			placeholder="Username"
			class="input"
		/>
	</div>
	<div class="mb-3">
		<Input
			type="password"
			name="password"
			placeholder="Password"
			class="input"
		/>
	</div>
	<div class="inline-flex items-center gap-3">
		<Button type="submit" class="btn">Sign In</Button>
		<a href="/register" class="hover:underline">Register</a>
	</div>
</form>
