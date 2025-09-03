import { z } from 'zod';

export const ArticleStatus = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
} as const;

export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus];

export const articleSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  status: z.enum([ArticleStatus.DRAFT, ArticleStatus.PUBLISHED]),
  author: z.string().min(1, 'Author is required').max(100, 'Author must be less than 100 characters'),
  createdAt: z.string().datetime(),
});

export type Article = z.infer<typeof articleSchema>;

export const createArticleSchema = articleSchema.omit({ id: true, createdAt: true });
export type CreateArticleInput = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = createArticleSchema.partial();
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SearchParams {
  query?: string;
  status?: ArticleStatus;
}

export interface ArticleFilters extends SearchParams, PaginationParams {}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}