<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Prop {
		children: Snippet;
		type: 'button' | 'submit';
	}

	let { children, type }: Prop = $props();
</script>

<button
	{type}
	class="rounded-lg border border-zinc-300 bg-white p-2 text-sm font-bold hover:border-zinc-400 hover:shadow-sm"
	>{@render children()}</button>