<script lang="ts">
  interface Props {
    variant?: 'default' | 'success' | 'warning';
    children?: import('svelte').Snippet;
  }

  let { variant = 'default', children }: Props = $props();

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  const badgeClasses = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`;
</script>

<span class={badgeClasses}>
  {@render children?.()}
</span>