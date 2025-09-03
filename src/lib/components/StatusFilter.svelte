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

<div class="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg" role="tablist" aria-label="Filter articles by status">
  {#each filters as filter (filter.value || 'all')}
    <button
      type="button"
      role="tab"
      aria-selected={selected === filter.value}
      onclick={() => handleClick(filter.value)}
      disabled={disabled}
      class="px-4 py-2 rounded-md text-sm font-medium transition-colors
        {selected === filter.value 
          ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {filter.label}
    </button>
  {/each}
</div>