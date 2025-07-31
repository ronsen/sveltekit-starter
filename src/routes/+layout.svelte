<script lang="ts">
	import type { LayoutData, SubmitFunction } from "./$types";
	import { enhance } from "$app/forms";
	import { page } from "$app/state";
	import {
		CirclePlus,
		LogIn,
		LogOut,
		Moon,
		Settings,
		Sun,
	} from "@lucide/svelte";
	import type { Snippet } from "svelte";

	import "../app.css";

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	let theme = $state(data.theme);

	const updateTheme: SubmitFunction = ({ action }) => {
		theme = action.searchParams.get("theme") ?? data.theme;

		if (theme) {
			document.documentElement.setAttribute("class", theme);
		}
	};
</script>

<main class="container md:w-[800px] px-8 mx-auto my-8">
	<div class="flex justify-between items-center border-b pb-2 mb-8">
		<h1 class="font-bold uppercase"><a href="/">Demo</a></h1>

		<div class="inline-flex items-center gap-4">
			{#if page.data.user}
				<a href="/add" title="Add New Note"><CirclePlus size={16} /></a>
				<a href="/settings" title="Settings"><Settings size={16} /></a>
			{/if}

			<form
				method="post"
				class="inline-flex gap-4"
				use:enhance={updateTheme}
			>
				{#if theme == "dark"}
					<button
						class="cursor-pointer"
						formaction="/?theme=light&redirectTo={page.url
							.pathname}"><Moon size={16} /></button
					>
				{:else}
					<button
						class="cursor-pointer"
						formaction="/?theme=dark&redirectTo={page.url.pathname}"
						><Sun size={16} /></button
					>
				{/if}
			</form>

			{#if !page.data.user}
				<a href="/login" title="Sign In"><LogIn size={16} /></a>
			{:else}
				<form
					method="POST"
					action="/logout"
					class="inline-flex"
					use:enhance
				>
					<button
						type="submit"
						class="cursor-pointer"
						title="Sign Out"><LogOut size={16} /></button
					>
				</form>
			{/if}
		</div>
	</div>

	{@render children()}
</main>
