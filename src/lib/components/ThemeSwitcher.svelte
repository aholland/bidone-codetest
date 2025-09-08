<script lang="ts">
  import themeStore, { setTheme } from 'svelte-themes';
  import MonitorIcon from './icons/MonitorIcon.svelte';
  import SunIcon from './icons/SunIcon.svelte';
  import MoonIcon from './icons/MoonIcon.svelte';
  import GiftIcon from './icons/GiftIcon.svelte';
  
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
</script>

<div class="flex items-center space-x-1">
  <span class="text-sm font-medium px-2 text-gray-600">Theme</span>
  
  <div class="flex rounded border overflow-hidden bg-white border-gray-300">
    {#each themes as theme (theme.value)}
      <button
        onclick={() => handleThemeChange(theme.value)}
        class="theme-button flex items-center justify-center {sizeClasses[validSize]} transition-colors duration-200 border-r last:border-r-0 min-w-[40px]
          {currentTheme === theme.value 
            ? 'theme-button-active'
            : 'theme-button-inactive'}"
        title={theme.label}
        aria-label={`Switch to ${theme.label} theme`}
      >
        {#if theme.value === 'system'}
          <MonitorIcon class="w-4 h-4" />
        {:else if theme.value === 'light'}
          <SunIcon class="w-4 h-4" />
        {:else if theme.value === 'dark'}
          <MoonIcon class="w-4 h-4" />
        {:else}
          <GiftIcon class="w-4 h-4" />
        {/if}
      </button>
    {/each}
  </div>
</div>