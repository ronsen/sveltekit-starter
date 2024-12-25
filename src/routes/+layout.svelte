<script lang="ts">
	import type { LayoutData, SubmitFunction } from "./$types";
	import { enhance } from "$app/forms";
	import { page } from "$app/state";
	import type { Snippet } from "svelte";

	import "../app.css";

	import Fa from "svelte-fa";
	import {
		faSun,
		faMoon,
		faSignIn,
		faSignOut,
		faGears,
		faPlus,
	} from "@fortawesome/free-solid-svg-icons";

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
				<a href="/add" title="Add New Note"><Fa icon={faPlus} /></a>
				<a href="/settings" title="Settings"><Fa icon={faGears} /></a>
			{/if}

			<form
				method="post"
				class="inline-flex gap-4"
				use:enhance={updateTheme}
			>
				{#if theme == "dark"}
					<button
						formaction="/?theme=light&redirectTo={page.url
							.pathname}"><Fa icon={faMoon} /></button
					>
				{:else}
					<button
						formaction="/?theme=dark&redirectTo={page.url.pathname}"
						><Fa icon={faSun} /></button
					>
				{/if}
			</form>

			{#if !page.data.user}
				<a href="/login" title="Sign In"><Fa icon={faSignIn} /></a>
			{:else}
				<form
					method="POST"
					action="/logout"
					class="inline-flex"
					use:enhance
				>
					<button type="submit" title="Sign Out"
						><Fa icon={faSignOut} /></button
					>
				</form>
			{/if}
		</div>
	</div>

	{@render children()}
</main>
