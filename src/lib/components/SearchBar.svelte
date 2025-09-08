<script lang="ts">
  import SearchIcon from './icons/SearchIcon.svelte';
  import CloseIcon from './icons/CloseIcon.svelte';

  interface Props {
    value?: string;
    onSearch: (query: string) => void;
    placeholder?: string;
    disabled?: boolean;
  }

  let { value: initialValue = '', onSearch, placeholder = 'Search...', disabled = false }: Props = $props();
  
  // Internal state for the input value - this doesn't trigger re-renders
  let internalValue = $state(initialValue);
  let debounceTimer: ReturnType<typeof setTimeout>;

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    internalValue = target.value;
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onSearch(internalValue);
    }, 300);
  }

  function handleClear() {
    internalValue = '';
    onSearch('');
  }
</script>

<div class="relative">
  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <SearchIcon class="h-5 w-5 text-gray-400" />
  </div>
  <input
    type="search"
    value={internalValue}
    {placeholder}
    {disabled}
    oninput={handleInput}
    class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
    aria-label="Search articles"
  />
  {#if internalValue}
    <button
      type="button"
      onclick={handleClear}
      disabled={disabled}
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Clear search"
    >
      <CloseIcon class="h-5 w-5" />
    </button>
  {/if}
</div>