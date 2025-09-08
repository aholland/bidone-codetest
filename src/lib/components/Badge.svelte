<script lang="ts">
  interface Props {
    variant?: 'default' | 'Published' | 'Draft';
    children?: import('svelte').Snippet;
  }

  let { variant = 'default', children }: Props = $props();
</script>

<span class="badge badge-{variant} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
  {@render children?.()}
</span>

<style>
  /* Default badge */
  .badge-default {
    background-color: var(--gray-100);
    color: var(--gray-800);
  }

  /* Published status - uses theme variables */
  .badge-Published {
    background-color: var(--badge-published-bg);
    color: var(--badge-published-text);
  }

  /* Draft status - uses theme variables */
  .badge-Draft {
    background-color: var(--badge-draft-bg);
    color: var(--badge-draft-text);
  }
</style>