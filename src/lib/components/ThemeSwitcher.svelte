<script lang="ts">
  import themeStore, { setTheme } from 'svelte-themes';
  
  type Theme = 'system' | 'light' | 'dark' | 'bidfood';
  
  let { size = 'md' } = $props<{
    size?: 'sm' | 'md' | 'lg'
  }>();
  
  const validSize = size as 'sm' | 'md' | 'lg';
  
  const currentTheme = $derived(($themeStore?.theme || 'system') as Theme);

  const themes = [
    { value: 'system' as Theme, icon: '💻', label: 'System' },
    { value: 'light' as Theme, icon: '☀️', label: 'Light' },
    { value: 'dark' as Theme, icon: '🌙', label: 'Dark' },
    { value: 'bidfood' as Theme, icon: '🍽️', label: 'BidFood' }
  ];
  
  function handleThemeChange(theme: Theme) {
    setTheme(theme);
  }
  
  const sizeClasses = {
    sm: 'text-xs p-1',
    md: 'text-sm p-1.5',
    lg: 'text-base p-2'
  };
  
  const iconSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
</script>

<div class="flex items-center space-x-1">
  <span class="text-sm font-medium px-2 text-gray-600 dark:text-gray-400">Theme</span>
  
  <div class="flex rounded border overflow-hidden bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
    {#each themes as theme}
      <button
        onclick={() => handleThemeChange(theme.value)}
        class="flex items-center justify-center {sizeClasses[validSize]} transition-colors duration-200 border-r last:border-r-0 min-w-[40px]
          {currentTheme === theme.value 
            ? 'bg-blue-600 text-white dark:bg-blue-500' 
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}"
        style="{currentTheme === theme.value && theme.value === 'bidfood' ? 'background-color: #72C262; color: white;' : ''}"
        title={theme.label}
        aria-label={`Switch to ${theme.label} theme`}
      >
        {#if theme.value === 'system'}
          <!-- System icon - a computer/monitor -->
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        {:else if theme.value === 'light'}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else if theme.value === 'dark'}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {:else}
          <!-- BidFood icon - a fork and knife -->
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        {/if}
      </button>
    {/each}
  </div>
</div>