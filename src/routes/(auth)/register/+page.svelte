<script lang="ts">
	import { enhance } from "$app/forms";
	import Alert from "$lib/components/alert.svelte";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<svelte:head>
	<title>Register New User</title>
</svelte:head>

{#if form?.error}
	<Alert>{@html form?.message}</Alert>
{/if}

<form method="post" use:enhance>
	<div class="mb-3">
		<input type="text" name="username" placeholder="Username" class="input input-bordered w-full">
	</div>
	<div class="mb-3">
		<input type="password" name="password" placeholder="Password" class="input input-bordered w-full">
	</div>
	<div class="inline-flex items-center gap-3">
		<button type="submit" class="btn btn-primary">Register</button>
	</div>
</form>
