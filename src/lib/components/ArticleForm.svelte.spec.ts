import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import ArticleForm from './ArticleForm.svelte';
import { ArticleStatus } from '../types/article';

describe('ArticleForm', () => {
  it('should render form fields', async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    
    const screen = render(ArticleForm, {
      props: { onSubmit, onCancel }
    });
    
    expect(screen.getByLabelText(/title/i)).toBeDefined();
    expect(screen.getByLabelText(/author/i)).toBeDefined();
    expect(screen.getByLabelText(/status/i)).toBeDefined();
  });

  it('should call onSubmit with form data when submitted', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const onCancel = vi.fn();
    
    const screen = render(ArticleForm, {
      props: { onSubmit, onCancel }
    });
    
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const authorInput = screen.getByLabelText(/author/i) as HTMLInputElement;
    const statusSelect = screen.getByLabelText(/status/i) as HTMLSelectElement;
    const submitButton = screen.getByRole('button', { name: /create article/i });
    
    await fireEvent.input(titleInput, { target: { value: 'Test Article' } });
    await fireEvent.input(authorInput, { target: { value: 'Test Author' } });
    await fireEvent.change(statusSelect, { target: { value: ArticleStatus.PUBLISHED } });
    
    await fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'Test Article',
        author: 'Test Author',
        status: ArticleStatus.PUBLISHED,
      });
    });
  });

  it('should display validation errors for empty fields', async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    
    const screen = render(ArticleForm, {
      props: { onSubmit, onCancel }
    });
    
    const submitButton = screen.getByRole('button', { name: /create article/i });
    await fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeDefined();
      expect(screen.getByText(/author is required/i)).toBeDefined();
    });
    
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should call onCancel when cancel button is clicked', async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    
    const screen = render(ArticleForm, {
      props: { onSubmit, onCancel }
    });
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await fireEvent.click(cancelButton);
    
    expect(onCancel).toHaveBeenCalled();
  });

  it('should populate form fields when editing an article', async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    
    const article = {
      id: 1,
      title: 'Existing Article',
      author: 'Existing Author',
      status: ArticleStatus.PUBLISHED,
      createdAt: '2024-01-01T00:00:00Z',
    };
    
    const screen = render(ArticleForm, {
      props: { article, onSubmit, onCancel }
    });
    
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const authorInput = screen.getByLabelText(/author/i) as HTMLInputElement;
    const statusSelect = screen.getByLabelText(/status/i) as HTMLSelectElement;
    
    expect(titleInput.value).toBe('Existing Article');
    expect(authorInput.value).toBe('Existing Author');
    expect(statusSelect.value).toBe(ArticleStatus.PUBLISHED);
  });

  it('should show update button when editing an article', async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    
    const article = {
      id: 1,
      title: 'Existing Article',
      author: 'Existing Author',
      status: ArticleStatus.PUBLISHED,
      createdAt: '2024-01-01T00:00:00Z',
    };
    
    const screen = render(ArticleForm, {
      props: { article, onSubmit, onCancel }
    });
    
    expect(screen.getByRole('button', { name: /update article/i })).toBeDefined();
  });

  it('should disable buttons during submission', async () => {
    const onSubmit = vi.fn(() => new Promise<void>(resolve => setTimeout(resolve, 100)));
    const onCancel = vi.fn();
    
    const screen = render(ArticleForm, {
      props: { onSubmit, onCancel }
    });
    
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const authorInput = screen.getByLabelText(/author/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /create article/i });
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    
    await fireEvent.input(titleInput, { target: { value: 'Test Article' } });
    await fireEvent.input(authorInput, { target: { value: 'Test Author' } });
    await fireEvent.click(submitButton);
    
    expect(submitButton.textContent).toContain('Saving...');
    expect(submitButton).toHaveProperty('disabled', true);
    expect(cancelButton).toHaveProperty('disabled', true);
    
    await waitFor(() => {
      expect(submitButton.textContent).toContain('Create Article');
    });
  });
});