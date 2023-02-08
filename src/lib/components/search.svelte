<script lang="ts">
    export let q: String = '';
</script>

<div class="mb-6">
    <form method="GET" action="/search">
        <div class="form-control">
            <div class="input-group">
                <input type="text" name="q" value="{q}" class="input input-bordered w-full" required>
                <button type="submit" class="btn btn-primary">Search</button>
            </div>
        </div>
    </form>
</div>