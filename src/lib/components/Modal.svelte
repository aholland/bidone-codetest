<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Props {
    open: boolean;
    title?: string;
    onClose: () => void;
    children?: import('svelte').Snippet;
  }

  let { open = $bindable(), title, onClose, children }: Props = $props();
  let dialog: HTMLDialogElement | undefined;
  let previousFocus: HTMLElement | null = null;

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  $effect(() => {
    if (open && dialog) {
      previousFocus = document.activeElement as HTMLElement;
      dialog.showModal();
      dialog.focus();
    } else if (!open && dialog && dialog.open) {
      dialog.close();
      if (previousFocus) {
        previousFocus.focus();
      }
    }
  });

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === dialog) {
      onClose();
    }
  }
</script>

{#if open}
  <dialog
    bind:this={dialog}
    class="fixed inset-0 z-50 overflow-y-auto p-4 backdrop:bg-black/50"
    aria-labelledby={title ? 'modal-title' : undefined}
    onclick={handleBackdropClick}
  >
    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl mx-auto">
      {#if title}
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 id="modal-title" class="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            onclick={onClose}
            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/if}
      <div class="p-6">
        {@render children?.()}
      </div>
    </div>
  </dialog>
{/if}