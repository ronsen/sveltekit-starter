<script lang="ts">
	import { Search } from "@lucide/svelte";

	let { q }: { q: string } = $props();
</script>

<section class="relative mb-6">
	<form method="GET" action="/search">
		<div class="inline-flex items-center gap-1 w-full">
			<input
				type="text"
				name="q"
				value={q}
				placeholder="Search..."
				class="input"
			/>
			<button type="submit" class="absolute right-0 top-0 p-3.5"
				><Search size={16} /></button
			>
		</div>
	</form>
</section>
