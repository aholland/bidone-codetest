<script lang="ts">
  import { onMount } from 'svelte';
  import CloseIcon from './icons/CloseIcon.svelte';
  
  interface Props {
    open: boolean;
    title?: string;
    onClose: () => void;
    children?: import('svelte').Snippet;
  }

  let { open = $bindable(), title, onClose, children }: Props = $props();
  let dialog = $state<HTMLDialogElement | undefined>();
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
    class="modal-dialog rounded-lg shadow-xl p-0 bg-transparent max-w-4xl w-[90vw]"
    aria-labelledby={title ? 'modal-title' : undefined}
    onclick={handleBackdropClick}
  >
    <div class="modal-content relative bg-white rounded-lg shadow-xl w-full">
      {#if title}
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="modal-title" class="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <button
            type="button"
            onclick={onClose}
            class="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon class="w-6 h-6" />
          </button>
        </div>
      {/if}
      <div class="p-6">
        {@render children?.()}
      </div>
    </div>
  </dialog>
{/if}

<style>
  dialog[open] {
    position: fixed;
    top: 180px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  /* Use the CSS variable for backdrop */
  .modal-dialog::backdrop {
    background-color: var(--modal-backdrop);
  }
  
  /* Fallback for browsers that don't support ::backdrop */
  .modal-dialog[open] {
    background-color: transparent;
  }
  
  .modal-content {
    background-color: var(--color-surface);
  }
</style>