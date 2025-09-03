import { z } from 'zod';
import { createArticleSchema, updateArticleSchema } from '../types/article';

export function validateCreateArticle(data: unknown) {
  return createArticleSchema.safeParse(data);
}

export function validateUpdateArticle(data: unknown) {
  return updateArticleSchema.safeParse(data);
}

export function formatValidationErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  
  error.issues.forEach((err) => {
    if (err.path.length > 0) {
      errors[err.path[0] as string] = err.message;
    }
  });
  
  return errors;
}