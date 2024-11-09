<script lang="ts">
	import Input from "./ui/input.svelte";

	import Fa from "svelte-fa";
	import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

	let { q }: { q: string } = $props();
</script>

<section class="relative mb-6">
	<form method="GET" action="/search">
		<div class="inline-flex items-center gap-1 w-full">
			<Input type="text" name="q" value={q} placeholder="Search..." />
			<button type="submit" class="absolute right-0 top-0 p-3.5"
				><Fa icon={faMagnifyingGlass} /></button
			>
		</div>
	</form>
</section>
