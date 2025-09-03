<script lang="ts">
  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children }: Props = $props();

  const cardClasses = `
    bg-white dark:bg-gray-800 
    [data-theme="bidfood"]:bg-white
    rounded-lg shadow-sm 
    border border-gray-200 dark:border-gray-700
    [data-theme="bidfood"]:border-[#e1e8ed]
    p-6 ${className}
  `.replace(/\s+/g, ' ').trim();
</script>

<article class={cardClasses}>
  {@render children?.()}
</article>