<script lang="ts">
	import type { LayoutData } from "./$types";
	import { enhance } from "$app/forms";
	import { page } from "$app/state";
	import type { Snippet } from "svelte";
	import { ModeWatcher } from "mode-watcher";
	import { CirclePlus, LogIn, LogOut, Settings } from "@lucide/svelte";
	import { Button, buttonVariants } from "$lib/components/ui/button";

	import "./layout.css";
	import Theme from "$lib/components/theme.svelte";

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<svelte:head>
	<link rel="icon" href="./favicon.png" />
</svelte:head>

<ModeWatcher />

<main class="max-w-2xl px-6 mx-auto my-6">
	<div class="flex justify-between items-center border-b pb-2 mb-8">
		<h1 class="font-bold uppercase"><a href="/">Demo</a></h1>

		<div class="inline-flex items-center">
			<Theme />

			{#if page.data.user}
				<a href="/add" class={buttonVariants({ variant: "ghost" })}
					><CirclePlus size={16} /></a
				>
				<a href="/settings" class={buttonVariants({ variant: "ghost" })}
					><Settings size={16} /></a
				>
			{/if}

			{#if !page.data.user}
				<a
					href="/login"
					title="Sign In"
					class={buttonVariants({ variant: "ghost" })}
					><LogIn size={16} /></a
				>
			{:else}
				<form
					method="POST"
					action="/logout"
					class="inline-flex"
					use:enhance
				>
					<Button
						type="submit"
						class="cursor-pointer"
						variant="ghost"
						title="Sign Out"><LogOut size={16} /></Button
					>
				</form>
			{/if}
		</div>
	</div>

	{@render children()}
</main>
