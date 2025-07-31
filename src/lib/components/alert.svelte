<script lang="ts">
	import type { Snippet } from "svelte";
	import { CircleAlert } from "@lucide/svelte";

	let { children }: { children: Snippet } = $props();
</script>

<div
	class="inline-flex items-center gap-2 p-4 w-full border border-amber-400 bg-amber-50 text-black/90 rounded-sm shadow-sm mb-6 text-sm"
>
	<div class="inline-flex items-center gap-2">
		<CircleAlert size={16} />
		<div>
			{@render children()}
		</div>
	</div>
</div>
