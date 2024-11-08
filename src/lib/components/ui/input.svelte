<script lang="ts">
	interface Prop {
		type: "text" | "password";
		name: string;
		value: string | null;
		placeholder: string;
	}

	let { type, name, value, placeholder }: Prop = $props();
</script>

<input
	{type}
	{name}
	bind:value
	{placeholder}
	class="w-full rounded-lg border-zinc-300"
/>
