<script lang="ts">
  import { createArticleSchema, updateArticleSchema, ArticleStatus, TITLE_MAX_LENGTH, AUTHOR_MAX_LENGTH } from '$lib/types/article';
  import type { Article, CreateArticleInput, UpdateArticleInput } from '$lib/types/article';
  import Input from './Input.svelte';
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
  let overrideValidation = $state(false);


  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    errors = {};

    const formData = {
      title: title.trim(),
      author: author.trim(),
      status,
    };

    try {
      // Skip validation if override is enabled
      let dataToSubmit = formData;
      
      if (!overrideValidation) {
        // Validate the form data
        const schema = article ? updateArticleSchema : createArticleSchema;
        dataToSubmit = schema.parse(formData);
      }

      submitting = true;
      await onSubmit(dataToSubmit);
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
    maxLength={TITLE_MAX_LENGTH}
  />

  <Input
    label="Author"
    bind:value={author}
    error={errors.author}
    required
    fullWidth
    placeholder="Enter author name"
    disabled={submitting}
    maxLength={AUTHOR_MAX_LENGTH}
  />

  <div class="flex items-center">
    <input
      type="checkbox"
      id="published"
      checked={status === ArticleStatus.PUBLISHED}
      onchange={(e) => status = e.currentTarget.checked ? ArticleStatus.PUBLISHED : ArticleStatus.DRAFT}
      disabled={submitting}
      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
    />
    <label for="published" class="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
      Publish
      {#if status === ArticleStatus.DRAFT}
        <span class="text-gray-500 dark:text-gray-400">(draft)</span>
      {/if}
    </label>
  </div>

  <div class="flex items-center justify-between pt-4 border-t dark:border-gray-700">
    <div class="flex items-start">
      <input
        type="checkbox"
        id="overrideValidation"
        bind:checked={overrideValidation}
        disabled={submitting}
        class="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded disabled:opacity-50"
      />
      <div class="ml-2">
        <label for="overrideValidation" class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Override validation
        </label>
        {#if overrideValidation}
          <p class="mt-1 text-xs text-orange-600 dark:text-orange-400">
            You can now leave fields empty or make them too long to test error handling.
          </p>
        {/if}
      </div>
    </div>
    <div class="flex gap-3">
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
        {submitting ? 'Saving...' : article ? 'Update Article' : status === ArticleStatus.PUBLISHED ? 'Publish article' : 'Create draft'}
      </Button>
    </div>
  </div>
</form>