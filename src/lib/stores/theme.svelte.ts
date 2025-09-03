class Theme {
  private currentTheme = $state<'light' | 'dark'>('light');

  constructor() {
    // Check for saved theme preference or default to light
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      this.currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      this.applyTheme();
    }
  }

  get theme() {
    return this.currentTheme;
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', this.currentTheme);
    }
  }

  private applyTheme() {
    if (typeof document !== 'undefined') {
      if (this.currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}

export const themeStore = new Theme();