<script lang="ts">
    export let prevPage: number;
    export let nextPage: number;
    export let href: string;
</script>

<div class="flex justify-center gap-3">
    {#if prevPage > 0}
        <a href="{href}page={prevPage}" class="btn btn-sm"><i class="bi bi-arrow-left" /></a>
    {/if}

    {#if nextPage > 0}
        <a href="{href}page={nextPage}" class="btn btn-sm"><i class="bi bi-arrow-right" /></a>
    {/if}
</div>
