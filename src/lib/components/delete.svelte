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

<dialog bind:this={dialog} class="p-6 shadow border rounded w-3/4">
	<form {action} method="post" onsubmit={() => dialog.close()} use:enhance>
		<h3 class="font-bold text-lg">Confirm</h3>
		<p class="py-4">{@html message}</p>
		<div class="inline-flex gap-3">
			<button class="p-2 rounded border" onclick={close}>No</button>
			<button type="submit" class="p-2 rounded border">Yes</button>
		</div>
	</form>
</dialog>
