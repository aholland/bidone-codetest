<script lang="ts">
  import type { Article } from '$lib/types/article';
  import { ArticleStatus } from '$lib/types/article';
  import { format } from 'date-fns';
  import { highlightText } from '$lib/utils/highlight';
  import Badge from './Badge.svelte';
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  import DocumentIcon from './icons/DocumentIcon.svelte';
  import UserIcon from './icons/UserIcon.svelte';
  import CalendarIcon from './icons/CalendarIcon.svelte';
  import EditIcon from './icons/EditIcon.svelte';
  import TrashIcon from './icons/TrashIcon.svelte';

  interface Props {
    articles: Article[];
    loading?: boolean;
    searchQuery?: string;
    onEdit: (article: Article) => void;
    onDelete: (article: Article) => void;
    readOnly?: boolean;
  }

  let { articles, loading = false, searchQuery = '', onEdit, onDelete, readOnly = false }: Props = $props();

  function formatDate(dateString: string) {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  }
</script>

<div class="space-y-4">
  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-hidden="true"></div>
        <p class="text-gray-600">Loading articles...</p>
      </div>
    </div>
  {:else if articles.length === 0}
    <Card>
      <div class="text-center py-12">
        <DocumentIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
        <p class="mt-1 text-sm text-gray-500">
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
              <h3 class="text-lg font-semibold text-gray-900">
                {@html highlightText(article.title, searchQuery)}
              </h3>
              <Badge variant={article.status}>
                {article.status}
              </Badge>
            </div>
            
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span class="flex items-center gap-1">
                <UserIcon class="w-4 h-4" />
                <span>{article.author}</span>
              </span>
              <span class="flex items-center gap-1">
                <CalendarIcon class="w-4 h-4" />
                <span>{formatDate(article.createdAt)}</span>
              </span>
            </div>
          </div>
          
          {#if !readOnly}
            <div class="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onclick={() => onEdit(article)}
                aria-label={`Edit article: ${article.title}`}
              >
                <EditIcon class="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onclick={() => onDelete(article)}
                aria-label={`Delete article: ${article.title}`}
              >
                <TrashIcon class="w-4 h-4" />
                Delete
              </Button>
            </div>
          {/if}
        </article>
      </Card>
    {/each}
  {/if}
</div>