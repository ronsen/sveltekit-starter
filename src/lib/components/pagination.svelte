<script lang="ts">
	import { MoveLeft, MoveRight } from "@lucide/svelte";
	import { Button, buttonVariants } from "$lib/components/ui/button";

	let {
		prevPage,
		nextPage,
		href,
	}: { prevPage: number; nextPage: number; href: string } = $props();
</script>

<div class="flex justify-between gap-3">
	{#if prevPage > 0}
		<a
			href="{href}page={prevPage}"
			class={buttonVariants({ variant: "default" })}
			><MoveLeft size={16} /></a
		>
	{:else}
		<Button disabled><MoveLeft size={16} /></Button>
	{/if}

	{#if nextPage > 0}
		<a
			href="{href}page={nextPage}"
			class={buttonVariants({ variant: "default" })}
			><MoveRight size={16} /></a
		>
	{:else}
		<Button disabled><MoveRight size={16} /></Button>
	{/if}
</div>
