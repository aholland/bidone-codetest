import { 
  fetchArticles, 
  createArticle as apiCreateArticle,
  updateArticle as apiUpdateArticle,
  deleteArticle as apiDeleteArticle 
} from '$lib/api/articles';
import type { 
  Article, 
  ArticleFilters, 
  CreateArticleInput, 
  UpdateArticleInput,
  PaginatedResponse 
} from '$lib/types/article';
import { ArticleStatus } from '$lib/types/article';

interface ArticlesState {
  articles: Article[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  searchLoading: boolean;
  error: string | null;
  filters: ArticleFilters;
}

class ArticlesStore {
  private state = $state<ArticlesState>({
    articles: [],
    total: 0,
    page: 1,
    totalPages: 0,
    loading: false,
    searchLoading: false,
    error: null,
    filters: {
      page: 1,
      limit: 10,
      query: '',
      status: undefined,
    },
  });

  get articles() {
    return this.state.articles;
  }

  get total() {
    return this.state.total;
  }

  get page() {
    return this.state.page;
  }

  get totalPages() {
    return this.state.totalPages;
  }

  get loading() {
    return this.state.loading;
  }

  get error() {
    return this.state.error;
  }

  get filters() {
    return this.state.filters;
  }

  get searchLoading() {
    return this.state.searchLoading;
  }

  async loadArticles(filters?: Partial<ArticleFilters>) {
    if (filters) {
      this.state.filters = { ...this.state.filters, ...filters };
    }

    this.state.loading = true;
    this.state.error = null;

    try {
      const response = await fetchArticles(this.state.filters);
      
      if (response.success && response.data) {
        const data: PaginatedResponse<Article> = response.data;
        this.state.articles = data.data;
        this.state.total = data.total;
        this.state.page = data.page;
        this.state.totalPages = data.totalPages;
      } else {
        this.state.error = response.error || 'Failed to load articles';
      }
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'An unexpected error occurred';
    } finally {
      this.state.loading = false;
    }
  }

  async createArticle(input: CreateArticleInput) {
    this.state.loading = true;
    this.state.error = null;

    try {
      const response = await apiCreateArticle(input);
      
      if (response.success && response.data) {
        // Reload articles to show the new one
        await this.loadArticles({ page: 1 });
        return response.data;
      } else {
        this.state.error = response.error || 'Failed to create article';
        throw new Error(this.state.error);
      }
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to create article';
      throw error;
    } finally {
      this.state.loading = false;
    }
  }

  async updateArticle(id: number, input: UpdateArticleInput) {
    this.state.loading = true;
    this.state.error = null;

    try {
      const response = await apiUpdateArticle(id, input);
      
      if (response.success && response.data) {
        // Update the article in the current list
        const index = this.state.articles.findIndex(a => a.id === id);
        if (index !== -1) {
          this.state.articles[index] = response.data;
        }
        return response.data;
      } else {
        this.state.error = response.error || 'Failed to update article';
        throw new Error(this.state.error);
      }
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to update article';
      throw error;
    } finally {
      this.state.loading = false;
    }
  }

  async deleteArticle(id: number) {
    this.state.loading = true;
    this.state.error = null;

    try {
      const response = await apiDeleteArticle(id);
      
      if (response.success) {
        // Remove the article from the current list
        this.state.articles = this.state.articles.filter(a => a.id !== id);
        this.state.total -= 1;
        
        // If we deleted the last item on a page, go to the previous page
        if (this.state.articles.length === 0 && this.state.page > 1) {
          await this.loadArticles({ page: this.state.page - 1 });
        } else if (this.state.articles.length < this.state.filters.limit) {
          // Reload to fill the page
          await this.loadArticles();
        }
      } else {
        this.state.error = response.error || 'Failed to delete article';
        throw new Error(this.state.error);
      }
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to delete article';
      throw error;
    } finally {
      this.state.loading = false;
    }
  }

  setPage(page: number) {
    this.loadArticles({ page });
  }

  setQuery(query: string) {
    // Just update the filter, let the debounced search handle the actual load
    this.state.filters.query = query;
    this.state.filters.page = 1;
  }
  
  async performSearch(query: string) {
    // This actually triggers the load after debounce
    this.state.filters.query = query;
    this.state.filters.page = 1;
    
    // Use searchLoading instead of loading to avoid disabling the search bar
    this.state.searchLoading = true;
    this.state.error = null;

    // Set flag for tests - search started
    if (typeof window !== 'undefined') {
      (window as any).__SEARCH_IN_PROGRESS__ = true;
      (window as any).__LAST_SEARCH_QUERY__ = query;
    }

    try {
      const response = await fetchArticles(this.state.filters);
      
      if (response.success && response.data) {
        const data: PaginatedResponse<Article> = response.data;
        this.state.articles = data.data;
        this.state.total = data.total;
        this.state.page = data.page;
        this.state.totalPages = data.totalPages;
      } else {
        this.state.error = response.error || 'Failed to load articles';
      }
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'An unexpected error occurred';
    } finally {
      this.state.searchLoading = false;
      // Set flag for tests - search completed
      if (typeof window !== 'undefined') {
        (window as any).__SEARCH_IN_PROGRESS__ = false;
        (window as any).__SEARCH_COMPLETE__ = true;
      }
    }
  }

  setStatus(status: string | undefined) {
    this.loadArticles({ 
      status: status as ArticleStatus | undefined, 
      page: 1 
    });
  }

  clearError() {
    this.state.error = null;
  }
}

export const articlesStore = new ArticlesStore();