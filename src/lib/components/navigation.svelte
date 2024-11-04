<script lang="ts">
	import Fa from "svelte-fa";
	import {
		faArrowLeft,
		faArrowRight,
	} from "@fortawesome/free-solid-svg-icons";

	let {
		prevPage,
		nextPage,
		href,
	}: { prevPage: number; nextPage: number; href: string } = $props();
</script>

<div class="flex justify-between gap-3">
	{#if prevPage > 0}
		<a href="{href}page={prevPage}"><Fa icon={faArrowLeft} /></a>
	{:else}
		<button class="cursor-default"><Fa icon={faArrowLeft} /></button>
	{/if}

	{#if nextPage > 0}
		<a href="{href}page={nextPage}"><Fa icon={faArrowRight} /></a>
	{:else}
		<button class="cursor-default"><Fa icon={faArrowRight} /></button>
	{/if}
</div>
