<script lang="ts">
    export let prevPage: Number;
    export let nextPage: Number;
    export let href: String;
</script>

<div class="flex justify-center gap-3">
    {#if prevPage > 0}
        <a href="{href}page={prevPage}" class="btn"><i class="bi bi-arrow-left" /></a>
    {/if}

    {#if nextPage > 0}
        <a href="{href}page={nextPage}" class="btn"><i class="bi bi-arrow-right" /></a>
    {/if}
</div>
