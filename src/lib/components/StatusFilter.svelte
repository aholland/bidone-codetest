<script lang="ts">
  import { ArticleStatus } from '$lib/types/article';

  interface Props {
    selected: string | undefined;
    onChange: (status: string | undefined) => void;
    disabled?: boolean;
  }

  let { selected = $bindable(), onChange, disabled = false }: Props = $props();

  const filters = [
    { value: undefined, label: 'All Articles' },
    { value: ArticleStatus.PUBLISHED, label: 'Published' },
    { value: ArticleStatus.DRAFT, label: 'Draft' },
  ];

  function handleClick(value: string | undefined) {
    if (!disabled && selected !== value) {
      selected = value;
      onChange(value);
    }
  }
</script>

<div class="status-filter flex items-center gap-1 p-1 rounded-lg" role="tablist" aria-label="Filter articles by status">
  {#each filters as filter (filter.value || 'all')}
    <button
      type="button"
      role="tab"
      aria-selected={selected === filter.value}
      onclick={() => handleClick(filter.value)}
      disabled={disabled}
      class="status-filter-button px-4 py-2 rounded-md text-sm font-medium transition-colors
        {selected === filter.value 
          ? 'status-filter-active' 
          : 'status-filter-inactive'}
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {filter.label}
    </button>
  {/each}
</div>

<style>
  .status-filter {
    background-color: var(--gray-100);
  }
  
  .status-filter-active {
    background-color: var(--color-surface);
    color: var(--color-primary);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .status-filter-inactive {
    color: var(--text-secondary);
  }
  
  .status-filter-inactive:hover:not(:disabled) {
    color: var(--text-primary);
  }
</style>