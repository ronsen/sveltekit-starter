<script lang="ts">
    export let prevPage: Number;
    export let nextPage: Number;
    export let href: String;
</script>

<div class="flex justify-center gap-3">
    {#if prevPage > 0}
        <a
            href="{href}page={prevPage}"
            class="border border-gray-200 p-2 text-gray-700 hover:text-gray-900"
            ><i class="bi bi-arrow-left" /></a
        >
    {/if}

    {#if nextPage > 0}
        <a
            href="{href}page={nextPage}"
            class="border border-gray-200 p-2 text-gray-500 hover:text-gray-900"
            ><i class="bi bi-arrow-right" /></a
        >
    {/if}
</div>
