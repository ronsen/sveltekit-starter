<script lang="ts">
	export let prevPage: number;
	export let nextPage: number;
	export let href: string;
	
	import Fa from "svelte-fa";
    import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="flex justify-center gap-3">
	{#if prevPage > 0}
		<a href="{href}page={prevPage}" class="btn btn-sm"><Fa icon={faArrowLeft} /></a>
	{/if}

	{#if nextPage > 0}
		<a href="{href}page={nextPage}" class="btn btn-sm"><Fa icon={faArrowRight} /></a>
	{/if}
</div>
