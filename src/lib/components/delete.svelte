<script lang="ts">
    import { enhance } from "$app/forms";

	let dialog: HTMLDialogElement;
	export let action: string;
	export let message: string;
</script>

<button title="Delete Note" class="text-gray-500" on:click={() => dialog.show()}><i class="bi bi-trash"></i></button>

<dialog bind:this={dialog} class="modal">
    <form {action} method="post" class="modal-box" on:submit|preventDefault={() => dialog.close()} use:enhance>
        <h3 class="font-bold text-lg">Confirm</h3>
        <p class="py-4">{@html message}</p>
        <div class="modal-action">
			<button class="btn btn-neutral btn-sm" on:click|preventDefault={() => dialog.close()}>No</button>
            <button type="submit" class="btn btn-error btn-sm">Yes</button>
        </div>
    </form>
</dialog>