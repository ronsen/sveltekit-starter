<script lang="ts">
	import { enhance } from "$app/forms";
	import Alert from "$lib/components/alert.svelte";
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
		<input
			type="text"
			name="username"
			placeholder="Username"
			class="input"
		/>
	</div>
	<div class="mb-3">
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="input"
		/>
	</div>
	<div class="inline-flex items-center gap-3">
		<button type="submit" class="btn">Sign In</button>
		<a href="/register">Register</a>
	</div>
</form>
