<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements';

  interface Props extends HTMLSelectAttributes {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    options: Array<{ value: string; label: string }>;
  }

  let {
    label,
    error,
    fullWidth = false,
    options,
    id,
    class: className = '',
    required = false,
    disabled = false,
    value = $bindable(),
    ...restProps
  }: Props = $props();

  const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;

  const baseClasses = 'block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-white';
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  const selectClasses = `${baseClasses} ${errorClasses} ${widthClass} ${className}`;
</script>

<div class={fullWidth ? 'w-full' : ''}>
  {#if label}
    <label for={selectId} class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}
      {#if required}
        <span class="text-red-500" aria-label="required">*</span>
      {/if}
    </label>
  {/if}
  <select
    id={selectId}
    bind:value
    {required}
    {disabled}
    class={selectClasses}
    aria-invalid={!!error}
    aria-describedby={error ? `${selectId}-error` : undefined}
    {...restProps}
  >
    {#each options as option (option.value)}
      <option value={option.value}>
        {option.label}
      </option>
    {/each}
  </select>
  {#if error}
    <p id="{selectId}-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
      {error}
    </p>
  {/if}
</div>