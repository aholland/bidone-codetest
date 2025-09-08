<script lang="ts">
  import { onMount } from 'svelte';
  import { articlesStore } from '$lib/stores/articles.svelte';
  import { setErrorSimulation } from '$lib/api/articles';
  import type { Article, CreateArticleInput, UpdateArticleInput } from '$lib/types/article';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import ArticleForm from '$lib/components/ArticleForm.svelte';
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import StatusFilter from '$lib/components/StatusFilter.svelte';
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
  import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
  import ErrorCircleIcon from '$lib/components/icons/ErrorCircleIcon.svelte';

  let showCreateModal = $state(false);
  let showEditModal = $state(false);
  let showDeleteModal = $state(false);
  let editingArticle = $state<Article | null>(null);
  let deletingArticle = $state<Article | null>(null);
  let statusFilter = $state<string | undefined>(undefined);
  let readOnlyMode = $state(false);
  let simulateErrors = $state(false);
  let errorRate = $state(50);

  onMount(() => {
    articlesStore.loadArticles().then(() => {
      // Set a flag for tests to know when initial load is complete
      if (typeof window !== 'undefined') {
        (window as any).__APP_READY__ = true;
      }
    });
  });

  // Update error simulation when settings change
  $effect(() => {
    setErrorSimulation(simulateErrors, errorRate);
  });

  function handleSearch(query: string) {
    // Just perform the search - the SearchBar handles its own state
    articlesStore.performSearch(query);
  }

  function handleStatusFilter(status: string | undefined) {
    articlesStore.setStatus(status);
  }

  function handlePageChange(page: number) {
    articlesStore.setPage(page);
  }

  function openCreateModal() {
    showCreateModal = true;
  }

  function closeCreateModal() {
    showCreateModal = false;
  }

  function openEditModal(article: Article) {
    editingArticle = article;
    showEditModal = true;
  }

  function closeEditModal() {
    editingArticle = null;
    showEditModal = false;
  }

  function openDeleteModal(article: Article) {
    deletingArticle = article;
    showDeleteModal = true;
  }

  function closeDeleteModal() {
    deletingArticle = null;
    showDeleteModal = false;
  }

  async function handleCreateArticle(data: CreateArticleInput | UpdateArticleInput) {
    try {
      await articlesStore.createArticle(data as CreateArticleInput);
      closeCreateModal();
    } catch (error) {
      console.error('Failed to create article:', error);
      throw error;
    }
  }

  async function handleUpdateArticle(data: UpdateArticleInput) {
    if (!editingArticle) return;
    
    try {
      await articlesStore.updateArticle(editingArticle.id, data);
      closeEditModal();
    } catch (error) {
      console.error('Failed to update article:', error);
      throw error;
    }
  }

  async function handleDeleteArticle() {
    if (!deletingArticle) return;
    
    try {
      await articlesStore.deleteArticle(deletingArticle.id);
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  }
</script>

<div class="container mx-auto px-4 py-8 max-w-7xl">
  <header class="mb-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Article management</h1>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <label for="simulateErrors" class="text-sm text-gray-700">
            Simulate errors
          </label>
          <input
            type="checkbox"
            id="simulateErrors"
            bind:checked={simulateErrors}
            class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <input
            type="number"
            bind:value={errorRate}
            min="0"
            max="100"
            step="5"
            disabled={!simulateErrors}
            class="w-16 px-2 py-1 text-sm border border-gray-300 rounded bg-white {simulateErrors ? 'text-gray-900' : 'text-gray-400 bg-gray-50'}"
            title="Error rate percentage"
          />
          <span class="text-sm {simulateErrors ? 'text-gray-600' : 'text-gray-400'}">%</span>
        </div>
        <div class="flex items-center gap-2">
          <label for="readOnlyMode" class="text-sm text-gray-700">
            View-only
          </label>
          <input
            type="checkbox"
            id="readOnlyMode"
            bind:checked={readOnlyMode}
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <ThemeSwitcher />
        <div class="w-36 h-10">
          {#if !readOnlyMode}
            <Button onclick={openCreateModal} variant="primary">
              <PlusIcon class="w-5 h-5 mr-2 flex-shrink-0" />
              <span class="whitespace-nowrap">New Article</span>
            </Button>
          {/if}
        </div>
      </div>
    </div>

    {#if simulateErrors}
      <div class="mb-3 text-sm text-red-600">
        Random errors ({errorRate}% chance) will occur for loading, searching, filtering, creating, updating, and deleting articles.
      </div>
    {/if}

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search articles by title..."
        />
      </div>
      <StatusFilter 
        bind:selected={statusFilter}
        onChange={handleStatusFilter}
        disabled={articlesStore.loading}
      />
    </div>
  </header>

  {#if articlesStore.error}
    <div class="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded" role="alert">
      <div class="flex items-center">
        <ErrorCircleIcon class="w-5 h-5 mr-2" />
        <span>{articlesStore.error}</span>
      </div>
    </div>
  {/if}

  <main>
    <ArticleList 
      articles={articlesStore.articles}
      loading={articlesStore.loading}
      searchQuery={articlesStore.filters.query}
      onEdit={openEditModal}
      onDelete={openDeleteModal}
      readOnly={readOnlyMode}
    />

    {#if articlesStore.totalPages > 1}
      <div class="mt-8">
        <Pagination
          currentPage={articlesStore.page}
          totalPages={articlesStore.totalPages}
          onPageChange={handlePageChange}
          disabled={articlesStore.loading}
        />
      </div>
    {/if}
  </main>

  <Modal open={showCreateModal} title="Create New Article" onClose={closeCreateModal}>
    <ArticleForm
      onSubmit={handleCreateArticle}
      onCancel={closeCreateModal}
    />
  </Modal>

  <Modal open={showEditModal} title="Edit Article" onClose={closeEditModal}>
    {#if editingArticle}
      <ArticleForm
        article={editingArticle}
        onSubmit={handleUpdateArticle}
        onCancel={closeEditModal}
      />
    {/if}
  </Modal>

  <Modal open={showDeleteModal} title="Delete Article" onClose={closeDeleteModal}>
    {#if deletingArticle}
      <div class="space-y-4">
        <p class="text-gray-700">
          Are you sure you want to delete the article <strong>"{deletingArticle.title}"</strong>? This action cannot be undone.
        </p>
        <div class="flex gap-3 justify-end pt-4">
          <Button variant="ghost" onclick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onclick={handleDeleteArticle} disabled={articlesStore.loading}>
            {articlesStore.loading ? 'Deleting...' : 'Delete Article'}
          </Button>
        </div>
      </div>
    {/if}
  </Modal>
</div>
