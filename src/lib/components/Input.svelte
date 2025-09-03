<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    label?: string;
    error?: string;
    fullWidth?: boolean;
  }

  let {
    label,
    error,
    fullWidth = false,
    id,
    type = 'text',
    class: className = '',
    required = false,
    disabled = false,
    value = $bindable(),
    ...restProps
  }: Props = $props();

  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

  const baseClasses = 'block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-white';
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  const inputClasses = `${baseClasses} ${errorClasses} ${widthClass} ${className}`;
</script>

<div class={fullWidth ? 'w-full' : ''}>
  {#if label}
    <label for={inputId} class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}
      {#if required}
        <span class="text-red-500" aria-label="required">*</span>
      {/if}
    </label>
  {/if}
  <input
    id={inputId}
    {type}
    {required}
    {disabled}
    bind:value
    class={inputClasses}
    aria-invalid={!!error}
    aria-describedby={error ? `${inputId}-error` : undefined}
    {...restProps}
  />
  {#if error}
    <p id="{inputId}-error" class="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
      {error}
    </p>
  {/if}
</div>