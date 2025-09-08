<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    maxLength?: number;
  }

  let {
    label,
    error,
    fullWidth = false,
    maxLength,
    id,
    type = 'text',
    class: className = '',
    required = false,
    disabled = false,
    value = $bindable(),
    onfocus,
    onblur,
    ...restProps
  }: Props = $props();

  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  let isFocused = $state(false);
  
  const charCount = $derived(String(value || '').length);
  const isOverLimit = $derived(maxLength ? charCount > maxLength : false);

  const baseClasses = 'block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900';
  const widthClass = fullWidth ? 'w-full' : '';

  const inputClasses = $derived((() => {
    const errorClasses = error || isOverLimit ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    return `${baseClasses} ${errorClasses} ${widthClass} ${className}`;
  })());
</script>

<div class={fullWidth ? 'w-full' : ''}>
  {#if label}
    <label for={inputId} class="block text-sm font-medium text-gray-700 mb-1">
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
    maxlength={maxLength}
    bind:value
    class={inputClasses}
    aria-invalid={!!error || isOverLimit}
    aria-describedby={error ? `${inputId}-error` : undefined}
    onfocus={(e) => {
      isFocused = true;
      onfocus?.(e);
    }}
    onblur={(e) => {
      isFocused = false;
      onblur?.(e);
    }}
    {...restProps}
  />
  <div class="h-5 mt-1">
    {#if maxLength && isFocused && charCount > 0}
      <p class="text-sm {isOverLimit ? 'text-red-600 underline' : 'text-gray-500'}">
        {charCount}/{maxLength}
      </p>
    {:else if error}
      <p id="{inputId}-error" class="text-sm text-red-600" role="alert">
        {error}
      </p>
    {/if}
  </div>
</div>