<script lang="ts">
  import Button from './Button.svelte';

  interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
  }

  let { currentPage, totalPages, onPageChange, disabled = false }: Props = $props();

  let pageNumbers = $derived(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  });

  function handlePageClick(page: number | string) {
    if (typeof page === 'number' && page !== currentPage && !disabled) {
      onPageChange(page);
    }
  }

  function handlePrevious() {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  }
</script>

<nav aria-label="Pagination" class="flex items-center justify-between">
  <div class="flex items-center gap-1">
    <Button
      variant="ghost"
      size="sm"
      onclick={handlePrevious}
      disabled={currentPage === 1 || disabled}
      aria-label="Go to previous page"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Previous
    </Button>
    
    <div class="flex items-center gap-1">
      {#each pageNumbers() as page (page)}
        {#if page === '...'}
          <span class="px-3 py-1 text-gray-500 dark:text-gray-400">...</span>
        {:else}
          <button
            type="button"
            onclick={() => handlePageClick(page)}
            disabled={disabled}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors
              {page === currentPage
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'} 
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {page}
          </button>
        {/if}
      {/each}
    </div>
    
    <Button
      variant="ghost"
      size="sm"
      onclick={handleNext}
      disabled={currentPage === totalPages || disabled}
      aria-label="Go to next page"
    >
      Next
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </Button>
  </div>
  
  <p class="text-sm text-gray-600 dark:text-gray-400">
    Page {currentPage} of {totalPages}
  </p>
</nav>