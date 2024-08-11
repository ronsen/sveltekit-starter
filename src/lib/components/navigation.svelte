<script lang="ts">
	import Fa from "svelte-fa";
	import {
		faArrowLeft,
		faArrowRight,
	} from "@fortawesome/free-solid-svg-icons";

	export let prevPage: number;
	export let nextPage: number;
	export let href: string;
</script>

<div class="flex justify-between gap-3">
	{#if prevPage > 0}
		<a href="{href}page={prevPage}" class="btn"><Fa icon={faArrowLeft} /></a
		>
	{:else}
		<button class="btn btn-disabled"><Fa icon={faArrowLeft} /></button>
	{/if}

	{#if nextPage > 0}
		<a href="{href}page={nextPage}" class="btn"
			><Fa icon={faArrowRight} /></a
		>
	{:else}
		<button class="btn btn-disabled"><Fa icon={faArrowRight} /></button>
	{/if}
</div>
