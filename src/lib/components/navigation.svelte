<script lang="ts">
	import { MoveLeft, MoveRight } from "@lucide/svelte";

	let {
		prevPage,
		nextPage,
		href,
	}: { prevPage: number; nextPage: number; href: string } = $props();
</script>

<div class="flex justify-between gap-3">
	{#if prevPage > 0}
		<a href="{href}page={prevPage}" class="btn"><MoveLeft size={16} /></a>
	{:else}
		<button class="btn cursor-default" disabled
			><MoveLeft size={16} /></button
		>
	{/if}

	{#if nextPage > 0}
		<a href="{href}page={nextPage}" class="btn"><MoveRight size={16} /></a>
	{:else}
		<button class="btn cursor-default" disabled
			><MoveRight size={16} /></button
		>
	{/if}
</div>
