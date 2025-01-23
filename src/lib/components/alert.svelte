<script lang="ts">
	import type { Snippet } from "svelte";

	import Fa from "svelte-fa";
	import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

	let { children }: { children: Snippet } = $props();
</script>

<div
	class="inline-flex items-center gap-2 p-4 w-full border border-amber-400 bg-amber-50 text-black/90 rounded-sm shadow-sm mb-6 text-sm"
>
	<div class="inline-flex items-center gap-2">
		<Fa icon={faInfoCircle} />
		<div>
			{@render children()}
		</div>
	</div>
</div>
