<script>
  import Add from "../components/add.svelte";
  import "../app.css";
</script>

<div class="flex justify-between items-center border-b pb-2 mb-8">
  <h1 class="font-bold uppercase text-lg"><a href="/">Catatan</a></h1>
  <a href="/add"><Add /></a>
</div>

<slot />
