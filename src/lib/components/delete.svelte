<script lang="ts">
	import { enhance } from "$app/forms";

	import Fa from "svelte-fa";
	import { faTrash } from "@fortawesome/free-solid-svg-icons";

	let { action, message }: { action: string; message: string } = $props();

	let dialog: HTMLDialogElement;

	function close(event: Event) {
		event.preventDefault();
		dialog.close();
	}
</script>

<button title="Delete Post" class="cursor-pointer" onclick={() => dialog.show()}
	><Fa icon={faTrash} /></button
>

<dialog
	bind:this={dialog}
	class="mx-auto shadow-sm border dark:border-zinc-700 dark:bg-zinc-800 dark:text-white/90 rounded-sm w-3/4 md:w-1/2"
>
	<form {action} method="post" onsubmit={() => dialog.close()} use:enhance>
		<div class="p-6">
			<p>{@html message}</p>
		</div>
		<div
			class="p-4 bg-zinc-50 dark:bg-zinc-900 w-full flex justify-end gap-4 text-sm"
		>
			<button class="hover:underline" onclick={close}>Cancel</button>
			<button type="submit" class="font-bold hover:underline"
				>Delete</button
			>
		</div>
	</form>
</dialog>
