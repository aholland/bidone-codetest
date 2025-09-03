<script lang="ts">
  import { createArticleSchema, updateArticleSchema, ArticleStatus } from '$lib/types/article';
  import type { Article, CreateArticleInput, UpdateArticleInput } from '$lib/types/article';
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import Button from './Button.svelte';
  import { z } from 'zod';

  interface Props {
    article?: Article;
    onSubmit: (data: CreateArticleInput | UpdateArticleInput) => Promise<void>;
    onCancel: () => void;
  }

  let { article, onSubmit, onCancel }: Props = $props();

  let title = $state(article?.title || '');
  let author = $state(article?.author || '');
  let status = $state(article?.status || ArticleStatus.DRAFT);
  let errors = $state<Record<string, string>>({});
  let submitting = $state(false);

  const statusOptions = [
    { value: ArticleStatus.DRAFT, label: 'Draft' },
    { value: ArticleStatus.PUBLISHED, label: 'Published' },
  ];

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    errors = {};

    const formData = {
      title: title.trim(),
      author: author.trim(),
      status,
    };

    try {
      // Validate the form data
      const schema = article ? updateArticleSchema : createArticleSchema;
      const validatedData = schema.parse(formData);

      submitting = true;
      await onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map Zod errors to our errors object
        error.issues.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0] as string] = err.message;
          }
        });
      } else {
        // Show generic error
        console.error('Form submission error:', error);
        errors.general = error instanceof Error ? error.message : 'An error occurred';
      }
    } finally {
      submitting = false;
    }
  }

  function handleCancel() {
    onCancel();
  }
</script>

<form onsubmit={handleSubmit} novalidate class="space-y-6">
  {#if errors.general}
    <div class="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded" role="alert">
      {errors.general}
    </div>
  {/if}

  <Input
    label="Title"
    bind:value={title}
    error={errors.title}
    required
    fullWidth
    placeholder="Enter article title"
    disabled={submitting}
  />

  <Input
    label="Author"
    bind:value={author}
    error={errors.author}
    required
    fullWidth
    placeholder="Enter author name"
    disabled={submitting}
  />

  <Select
    label="Status"
    bind:value={status}
    options={statusOptions}
    error={errors.status}
    required
    fullWidth
    disabled={submitting}
  />

  <div class="flex gap-3 justify-end pt-4 border-t dark:border-gray-700">
    <Button
      type="button"
      variant="ghost"
      onclick={handleCancel}
      disabled={submitting}
    >
      Cancel
    </Button>
    <Button
      type="submit"
      variant="primary"
      disabled={submitting}
    >
      {submitting ? 'Saving...' : article ? 'Update Article' : 'Create Article'}
    </Button>
  </div>
</form>