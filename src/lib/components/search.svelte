<script lang="ts">
	let { q }: { q: string } = $props();
</script>

<section class="mb-6">
	<form method="GET" action="/search">
		<div class="inline-flex items-center gap-1 w-full">
			<input
				type="text"
				name="q"
				value={q}
				class="rounded w-full"
				required
			/>
			<button type="submit" class="p-2 rounded border">Search</button>
		</div>
	</form>
</section>
