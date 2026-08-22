<script lang="ts">
	import { Search } from "@lucide/svelte";
	import * as InputGroup from "$lib/components/ui/input-group";

	let { q }: { q: string } = $props();
</script>

<section class="relative mb-6">
	<form method="GET" action="/search">
		<InputGroup.Root>
			<InputGroup.Input
				type="text"
				name="q"
				value={q}
				placeholder="Search..."
				class="input"
			/>
			<InputGroup.Addon align="inline-end">
				<InputGroup.Button
					type="submit"
					class="absolute right-0 top-0 p-3.5"
					><Search size={16} /></InputGroup.Button
				>
			</InputGroup.Addon>
		</InputGroup.Root>
	</form>
</section>
