<script lang="ts">
  import { setTheme } from 'svelte-themes';
  import Button from './Button.svelte';
  import { onMount } from 'svelte';
  
  type Theme = 'light' | 'dark' | 'bidfood';
  const themes: Theme[] = ['light', 'dark', 'bidfood'];
  
  let currentTheme = $state<Theme>('light');
  
  onMount(() => {
    // Get initial theme from DOM
    const dataTheme = document.documentElement.getAttribute('data-theme');
    currentTheme = (dataTheme as Theme) || 'light';
    
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      currentTheme = (newTheme as Theme) || 'light';
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  });
  
  function toggleTheme() {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    setTheme(newTheme);
    currentTheme = newTheme;
  }
  
  function getThemeIcon(theme: Theme) {
    switch(theme) {
      case 'dark':
        return 'moon';
      case 'bidfood':
        return 'brand';
      default:
        return 'sun';
    }
  }
</script>

<Button
  variant="ghost"
  size="sm"
  onclick={toggleTheme}
  aria-label={`Current theme: ${currentTheme}. Click to switch theme`}
  title={`Theme: ${currentTheme}`}
>
  {#if currentTheme === 'dark'}
    <!-- Moon icon for dark theme -->
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  {:else if currentTheme === 'bidfood'}
    <!-- Brand icon for BidFood theme -->
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  {:else}
    <!-- Sun icon for light theme -->
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  {/if}
  <span class="ml-2 text-xs">{currentTheme}</span>
</Button>