import { describe, it, expect } from 'vitest';
import { validateCreateArticle, validateUpdateArticle, formatValidationErrors } from './validation';
import { ArticleStatus } from '../types/article';
import { z } from 'zod';

describe('validation utils', () => {
  describe('validateCreateArticle', () => {
    it('should validate a valid article', () => {
      const validArticle = {
        title: 'Test Article',
        author: 'John Doe',
        status: ArticleStatus.DRAFT,
      };

      const result = validateCreateArticle(validArticle);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validArticle);
      }
    });

    it('should reject an article with missing title', () => {
      const invalidArticle = {
        author: 'John Doe',
        status: ArticleStatus.DRAFT,
      };

      const result = validateCreateArticle(invalidArticle);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(e => e.path[0] === 'title')).toBe(true);
      }
    });

    it('should reject an article with empty title', () => {
      const invalidArticle = {
        title: '',
        author: 'John Doe',
        status: ArticleStatus.DRAFT,
      };

      const result = validateCreateArticle(invalidArticle);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(e => e.path[0] === 'title')).toBe(true);
      }
    });

    it('should reject an article with title exceeding max length', () => {
      const invalidArticle = {
        title: 'a'.repeat(201),
        author: 'John Doe',
        status: ArticleStatus.DRAFT,
      };

      const result = validateCreateArticle(invalidArticle);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(e => e.path[0] === 'title')).toBe(true);
      }
    });

    it('should reject an article with invalid status', () => {
      const invalidArticle = {
        title: 'Test Article',
        author: 'John Doe',
        status: 'Invalid Status',
      };

      const result = validateCreateArticle(invalidArticle);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(e => e.path[0] === 'status')).toBe(true);
      }
    });

    it('should reject an article with missing author', () => {
      const invalidArticle = {
        title: 'Test Article',
        status: ArticleStatus.PUBLISHED,
      };

      const result = validateCreateArticle(invalidArticle);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(e => e.path[0] === 'author')).toBe(true);
      }
    });
  });

  describe('validateUpdateArticle', () => {
    it('should validate a partial update', () => {
      const update = {
        title: 'Updated Title',
      };

      const result = validateUpdateArticle(update);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(update);
      }
    });

    it('should validate an empty update', () => {
      const update = {};

      const result = validateUpdateArticle(update);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(update);
      }
    });

    it('should reject invalid field in update', () => {
      const update = {
        title: '',
      };

      const result = validateUpdateArticle(update);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some(e => e.path[0] === 'title')).toBe(true);
      }
    });

    it('should validate update with all fields', () => {
      const update = {
        title: 'Updated Title',
        author: 'Jane Doe',
        status: ArticleStatus.PUBLISHED,
      };

      const result = validateUpdateArticle(update);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(update);
      }
    });
  });

  describe('formatValidationErrors', () => {
    it('should format single error correctly', () => {
      const error = new z.ZodError([
        {
          code: 'too_small',
          minimum: 1,
          inclusive: true,
          exact: false,
          path: ['title'],
          message: 'Title is required',
        } as z.ZodIssue,
      ]);

      const formatted = formatValidationErrors(error);
      
      expect(formatted).toEqual({
        title: 'Title is required',
      });
    });

    it('should format multiple errors correctly', () => {
      const error = new z.ZodError([
        {
          code: 'too_small',
          minimum: 1,
          inclusive: true,
          exact: false,
          path: ['title'],
          message: 'Title is required',
        } as z.ZodIssue,
        {
          code: 'too_small',
          minimum: 1,
          inclusive: true,
          exact: false,
          path: ['author'],
          message: 'Author is required',
        } as z.ZodIssue,
      ]);

      const formatted = formatValidationErrors(error);
      
      expect(formatted).toEqual({
        title: 'Title is required',
        author: 'Author is required',
      });
    });

    it('should handle nested path errors', () => {
      const error = new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          path: ['nested', 'field'],
          message: 'Invalid field',
        } as z.ZodIssue,
      ]);

      const formatted = formatValidationErrors(error);
      
      expect(formatted).toEqual({
        nested: 'Invalid field',
      });
    });

    it('should return empty object for errors without path', () => {
      const error = new z.ZodError([
        {
          code: 'custom',
          path: [],
          message: 'General error',
        } as z.ZodIssue,
      ]);

      const formatted = formatValidationErrors(error);
      
      expect(formatted).toEqual({});
    });
  });
});