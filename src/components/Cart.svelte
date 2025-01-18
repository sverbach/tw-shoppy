<script lang="ts">
  import { onMount } from 'svelte';

  let showModal = $state(false);

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'p' || event.key === 'P') {
      showModal = true;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  function closeModal() {
    showModal = false;
  }
</script>

{#if showModal}
  <div class="bg-gray-800 fixed inset-0 flex items-center justify-center bg-opacity-75">
    <div class="bg-white rounded relative p-4 shadow-lg">
      <button class="text-xl absolute right-0 top-0 cursor-pointer p-2" type="button" onclick={closeModal}
        >close</button
      >
      <p>This is a modal!</p>
    </div>
  </div>
{/if}
