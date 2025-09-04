<script lang="ts">
  import type { Article } from '$lib/types/article';
  import { ArticleStatus } from '$lib/types/article';
  import { format } from 'date-fns';
  import { highlightText } from '$lib/utils/highlight';
  import Badge from './Badge.svelte';
  import Button from './Button.svelte';
  import Card from './Card.svelte';

  interface Props {
    articles: Article[];
    loading?: boolean;
    searchQuery?: string;
    onEdit: (article: Article) => void;
    onDelete: (article: Article) => void;
  }

  let { articles, loading = false, searchQuery = '', onEdit, onDelete }: Props = $props();

  function formatDate(dateString: string) {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  }

  function getBadgeVariant(status: string) {
    return status === ArticleStatus.PUBLISHED ? 'success' : 'warning';
  }
</script>

<div class="space-y-4">
  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-hidden="true"></div>
        <p class="text-gray-600 dark:text-gray-400">Loading articles...</p>
      </div>
    </div>
  {:else if articles.length === 0}
    <Card>
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No articles found</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Get started by creating a new article.
        </p>
      </div>
    </Card>
  {:else}
    {#each articles as article (article.id)}
      <Card>
        <article class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {@html highlightText(article.title, searchQuery)}
              </h3>
              <Badge variant={getBadgeVariant(article.status)}>
                {article.status}
              </Badge>
            </div>
            
            <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{article.author}</span>
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(article.createdAt)}</span>
              </span>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onclick={() => onEdit(article)}
              aria-label={`Edit article: ${article.title}`}
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onclick={() => onDelete(article)}
              aria-label={`Delete article: ${article.title}`}
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </Button>
          </div>
        </article>
      </Card>
    {/each}
  {/if}
</div>