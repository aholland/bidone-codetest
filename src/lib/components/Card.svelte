<script lang="ts">
  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', children }: Props = $props();
</script>

<div class="card rounded-lg shadow-sm p-6 {className}">
  {@render children?.()}
</div>

<style>
  .card {
    background-color: var(--color-surface);
    border: 1px solid var(--border-primary);
  }
</style>