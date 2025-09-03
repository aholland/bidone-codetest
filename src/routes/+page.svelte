<script lang="ts">
  import { onMount } from 'svelte';
  import { articlesStore } from '$lib/stores/articles.svelte';
  import type { Article, CreateArticleInput, UpdateArticleInput } from '$lib/types/article';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import ArticleForm from '$lib/components/ArticleForm.svelte';
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import StatusFilter from '$lib/components/StatusFilter.svelte';
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

  let showCreateModal = $state(false);
  let showEditModal = $state(false);
  let showDeleteModal = $state(false);
  let editingArticle = $state<Article | null>(null);
  let deletingArticle = $state<Article | null>(null);
  let searchQuery = $state('');
  let statusFilter = $state<string | undefined>(undefined);

  onMount(() => {
    articlesStore.loadArticles();
  });

  function handleSearch(query: string) {
    articlesStore.setQuery(query);
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
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Article management</h1>
      <div class="flex items-center gap-3">
        <ThemeSwitcher />
        <Button onclick={openCreateModal} variant="primary">
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
          New Article
        </Button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <SearchBar 
          bind:value={searchQuery} 
          onSearch={handleSearch}
          placeholder="Search articles by title..."
          disabled={articlesStore.loading}
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
    <div class="mb-6 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded" role="alert">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
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
        <p class="text-gray-700 dark:text-gray-300">
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
