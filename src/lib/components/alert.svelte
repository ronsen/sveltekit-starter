<script lang="ts">
	import type { Snippet } from "svelte";
	import { CircleAlert } from "@lucide/svelte";
	import * as Alert from "$lib/components/ui/alert";

	let { children }: { children: Snippet } = $props();
</script>

<Alert.Root class="mb-4">
	<CircleAlert />
	<Alert.Description>
		{@render children()}
	</Alert.Description>
</Alert.Root>
