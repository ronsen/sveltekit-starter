<script lang="ts">
    export let q: String;
</script>

<form method="GET" action="/search">
    <div class="flex mb-6">
        <input type="text" name="q" value="{q}" class="w-full p-2 border border-gray-300 rounded-l" required>
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded-r text-white">Search</button>
    </div>
</form>