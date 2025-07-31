<script lang="ts">
	import { Search } from "@lucide/svelte";
	import Input from "./ui/input.svelte";

	let { q }: { q: string } = $props();
</script>

<section class="relative mb-6">
	<form method="GET" action="/search">
		<div class="inline-flex items-center gap-1 w-full">
			<Input type="text" name="q" value={q} placeholder="Search..." />
			<button type="submit" class="absolute right-0 top-0 p-3.5"
				><Search size={16} /></button
			>
		</div>
	</form>
</section>
