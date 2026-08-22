<script lang="ts">
	import { Trash } from "@lucide/svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Button } from "$lib/components/ui/button";

	let { action, title }: { action: string; title: string } = $props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button variant="ghost"><Trash size={16} /></Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete this post?</AlertDialog.Title>
			<AlertDialog.Description>{title}</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form method="POST" {action}>
				<AlertDialog.Action class="w-full">Delete</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
