<script lang="ts">

  interface Props {
    value: string;
    onSearch: (query: string) => void;
    placeholder?: string;
    disabled?: boolean;
  }

  let { value = $bindable(), onSearch, placeholder = 'Search...', disabled = false }: Props = $props();
  let debounceTimer: ReturnType<typeof setTimeout>;

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onSearch(value);
    }, 300);
  }

  function handleClear() {
    value = '';
    onSearch('');
  }
</script>

<div class="relative">
  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
  <input
    type="search"
    {value}
    {placeholder}
    {disabled}
    oninput={handleInput}
    class="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
    aria-label="Search articles"
  />
  {#if value}
    <button
      type="button"
      onclick={handleClear}
      disabled={disabled}
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Clear search"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  {/if}
</div>