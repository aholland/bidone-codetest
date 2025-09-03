<script lang="ts">
  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children }: Props = $props();

  const cardClasses = `bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`;
</script>

<article class={cardClasses}>
  {@render children?.()}
</article>