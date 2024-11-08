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

<button title="Delete Post" class="text-error" onclick={() => dialog.show()}
	><Fa icon={faTrash} /></button
>

<dialog bind:this={dialog} class="shadow border rounded w-3/4 md:w-1/2">
	<form {action} method="post" onsubmit={() => dialog.close()} use:enhance>
		<div class="p-4">
			<h3 class="font-bold mb-3">Confirm</h3>
			<p>{@html message}</p>
		</div>
		<div class="p-4 bg-zinc-50 w-full flex justify-end gap-4 text-sm">
			<button class="hover:underline" onclick={close}>No</button>
			<button type="submit" class="font-bold hover:underline">Yes</button>
		</div>
	</form>
</dialog>
