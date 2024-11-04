<script lang="ts">
	import Fa from "svelte-fa";
	import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
</script>

<div
	class="inline-flex items-center gap-2 p-4 w-full border rounded shadow mb-6"
>
	<div class="inline-flex items-center gap-1">
		<Fa icon={faInfoCircle} />
		<slot />
	</div>
</div>
