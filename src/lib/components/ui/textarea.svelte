<script lang="ts">
	interface Prop {
		name: string;
		rows: number;
		value?: string | null;
		placeholder?: string | null;
	}

	let { name, value, rows, placeholder }: Prop = $props();
</script>

<textarea
	{name}
	bind:value
	{rows}
	{placeholder}
	class="w-full rounded-lg border-zinc-300 font-mono text-sm"
></textarea>
