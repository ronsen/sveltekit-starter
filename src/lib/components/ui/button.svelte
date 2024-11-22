<script lang="ts">
	import type { Snippet } from "svelte";

	interface Prop {
		children: Snippet;
		type: "button" | "submit";
	}

	let { children, type }: Prop = $props();
</script>

<button
	{type}
	class="rounded-lg border border-zinc-300 hover:border-zinc-400 bg-white px-3 py-2 text-sm dark:bg-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-600"
	>{@render children()}</button
>
