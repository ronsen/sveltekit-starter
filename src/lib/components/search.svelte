<script lang="ts">
	export let q: string = "";
</script>

<div class="mb-6">
	<form method="GET" action="/search">
		<div class="form-control">
			<div class="join join-horizontal">
				<input
					type="text"
					name="q"
					value={q}
					class="input input-bordered w-full join-item"
					required
				/>
				<button type="submit" class="btn btn-primary join-item">Search</button>
			</div>
		</div>
	</form>
</div>
