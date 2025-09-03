import type {
  Article,
  ArticleFilters,
  CreateArticleInput,
  UpdateArticleInput,
  PaginatedResponse,
  ApiResponse,
} from '$lib/types/article';
import { getArticles, setArticles, getNextId } from './mock-db';

const DELAY_MS = 300;

async function delay(ms: number = DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function simulateError(chance: number = 0.05): boolean {
  return Math.random() < chance;
}

export async function fetchArticles(
  filters: ArticleFilters
): Promise<ApiResponse<PaginatedResponse<Article>>> {
  await delay();

  if (simulateError(0.02)) {
    return {
      success: false,
      error: 'Failed to fetch articles. Please try again.',
    };
  }

  try {
    let articles = getArticles();

    // Apply search filter
    if (filters.query) {
      const query = filters.query.toLowerCase();
      articles = articles.filter((article) =>
        article.title.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filters.status) {
      articles = articles.filter((article) => article.status === filters.status);
    }

    // Sort by creation date (newest first)
    articles.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Calculate pagination
    const total = articles.length;
    const totalPages = Math.ceil(total / filters.limit);
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit;
    const paginatedArticles = articles.slice(start, end);

    return {
      success: true,
      data: {
        data: paginatedArticles,
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function fetchArticle(id: number): Promise<ApiResponse<Article>> {
  await delay();

  if (simulateError(0.02)) {
    return {
      success: false,
      error: 'Failed to fetch article. Please try again.',
    };
  }

  const articles = getArticles();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return {
      success: false,
      error: 'Article not found',
    };
  }

  return {
    success: true,
    data: article,
  };
}

export async function createArticle(
  input: CreateArticleInput
): Promise<ApiResponse<Article>> {
  await delay();

  if (simulateError(0.03)) {
    return {
      success: false,
      error: 'Failed to create article. Please try again.',
    };
  }

  try {
    const articles = getArticles();
    const newArticle: Article = {
      ...input,
      id: getNextId(),
      createdAt: new Date().toISOString(),
    };

    setArticles([...articles, newArticle]);

    return {
      success: true,
      data: newArticle,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create article',
    };
  }
}

export async function updateArticle(
  id: number,
  input: UpdateArticleInput
): Promise<ApiResponse<Article>> {
  await delay();

  if (simulateError(0.03)) {
    return {
      success: false,
      error: 'Failed to update article. Please try again.',
    };
  }

  try {
    const articles = getArticles();
    const index = articles.findIndex((a) => a.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Article not found',
      };
    }

    const updatedArticle = {
      ...articles[index],
      ...input,
    };

    const newArticles = [...articles];
    newArticles[index] = updatedArticle;
    setArticles(newArticles);

    return {
      success: true,
      data: updatedArticle,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update article',
    };
  }
}

export async function deleteArticle(id: number): Promise<ApiResponse<void>> {
  await delay();

  if (simulateError(0.03)) {
    return {
      success: false,
      error: 'Failed to delete article. Please try again.',
    };
  }

  try {
    const articles = getArticles();
    const index = articles.findIndex((a) => a.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Article not found',
      };
    }

    const newArticles = articles.filter((a) => a.id !== id);
    setArticles(newArticles);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete article',
    };
  }
}