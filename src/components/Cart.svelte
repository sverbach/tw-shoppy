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
  <div class="bg-opacity-75 fixed inset-0 flex items-center justify-center bg-gray-800">
    <div class="relative rounded bg-white p-4 shadow-lg">
      <button class="absolute top-0 right-0 cursor-pointer p-2 text-xl" type="button" onclick={closeModal}>close</button>
      <p>This is a modal!</p>
    </div>
  </div>
{/if}
