<script lang="ts">
    import type { Snippet } from "svelte";
	
	import Fa from "svelte-fa";
	import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

	let { children }: { children: Snippet } = $props();
</script>

<div
	class="inline-flex items-center gap-2 p-4 w-full border rounded shadow mb-6"
>
	<div class="inline-flex items-center gap-1">
		<Fa icon={faInfoCircle} />
		<div>
			{@render children()}
		</div>
	</div>
</div>
