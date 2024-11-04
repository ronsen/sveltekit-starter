<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	import "../app.css";

	import Fa from "svelte-fa";
	import {
		faSignIn,
		faSignOut,
		faGears,
		faPlus,
	} from "@fortawesome/free-solid-svg-icons";
</script>

<main class="container md:w-[800px] px-8 mx-auto my-8">
	<div class="flex justify-between items-center border-b pb-2 mb-8">
		<h1 class="font-bold uppercase"><a href="/">Demo</a></h1>

		<div class="inline-flex items-center gap-4">
			{#if $page.data.user}
				<a href="/add" title="Add New Note"><Fa icon={faPlus} /></a>
				<a href="/settings" title="Settings"><Fa icon={faGears} /></a>
			{/if}

			{#if !$page.data.user}
				<a href="/login" title="Sign In"><Fa icon={faSignIn} /></a>
			{:else}
				<form method="POST" action="/logout" use:enhance>
					<button type="submit" title="Sign Out"><Fa icon={faSignOut} /></button>
				</form>
			{/if}
		</div>
	</div>

	<slot />
</main>
