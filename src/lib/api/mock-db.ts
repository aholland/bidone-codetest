import type { Article } from '$lib/types/article';
import { ArticleStatus } from '$lib/types/article';

let nextId = 21;

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Getting Started with SvelteKit',
    status: ArticleStatus.PUBLISHED,
    author: 'Jane Doe',
    createdAt: '2024-01-15T09:30:00Z',
  },
  {
    id: 2,
    title: 'Understanding Reactive Programming',
    status: ArticleStatus.PUBLISHED,
    author: 'John Smith',
    createdAt: '2024-01-16T14:20:00Z',
  },
  {
    id: 3,
    title: 'TypeScript Best Practices',
    status: ArticleStatus.DRAFT,
    author: 'Alice Johnson',
    createdAt: '2024-01-17T11:45:00Z',
  },
  {
    id: 4,
    title: 'Building Accessible Web Applications',
    status: ArticleStatus.PUBLISHED,
    author: 'Bob Wilson',
    createdAt: '2024-01-18T16:00:00Z',
  },
  {
    id: 5,
    title: 'State Management in Modern Web Apps',
    status: ArticleStatus.DRAFT,
    author: 'Carol Martinez',
    createdAt: '2024-01-19T10:15:00Z',
  },
  {
    id: 6,
    title: 'Performance Optimization Techniques',
    status: ArticleStatus.PUBLISHED,
    author: 'David Lee',
    createdAt: '2024-01-20T13:30:00Z',
  },
  {
    id: 7,
    title: 'Introduction to Web Components',
    status: ArticleStatus.PUBLISHED,
    author: 'Emma Brown',
    createdAt: '2024-01-21T08:45:00Z',
  },
  {
    id: 8,
    title: 'CSS Grid Layout Complete Guide',
    status: ArticleStatus.DRAFT,
    author: 'Frank Zhang',
    createdAt: '2024-01-22T15:20:00Z',
  },
  {
    id: 9,
    title: 'Modern JavaScript Features',
    status: ArticleStatus.PUBLISHED,
    author: 'Grace Kim',
    createdAt: '2024-01-23T12:00:00Z',
  },
  {
    id: 10,
    title: 'Testing Strategies for Web Apps',
    status: ArticleStatus.DRAFT,
    author: 'Henry Taylor',
    createdAt: '2024-01-24T09:30:00Z',
  },
  {
    id: 11,
    title: 'Progressive Web Apps Deep Dive',
    status: ArticleStatus.PUBLISHED,
    author: 'Isabel Rodriguez',
    createdAt: '2024-01-25T14:45:00Z',
  },
  {
    id: 12,
    title: 'API Design Best Practices',
    status: ArticleStatus.PUBLISHED,
    author: 'Jack Anderson',
    createdAt: '2024-01-26T11:10:00Z',
  },
  {
    id: 13,
    title: 'Micro-Frontend Architecture',
    status: ArticleStatus.DRAFT,
    author: 'Karen White',
    createdAt: '2024-01-27T16:30:00Z',
  },
  {
    id: 14,
    title: 'WebAssembly for Beginners',
    status: ArticleStatus.PUBLISHED,
    author: 'Leo Thompson',
    createdAt: '2024-01-28T08:00:00Z',
  },
  {
    id: 15,
    title: 'Security Best Practices for Web Dev',
    status: ArticleStatus.PUBLISHED,
    author: 'Maria Garcia',
    createdAt: '2024-01-29T13:15:00Z',
  },
  {
    id: 16,
    title: 'GraphQL vs REST: A Comparison',
    status: ArticleStatus.DRAFT,
    author: 'Nathan Clark',
    createdAt: '2024-01-30T10:40:00Z',
  },
  {
    id: 17,
    title: 'Responsive Design Patterns',
    status: ArticleStatus.PUBLISHED,
    author: 'Olivia Harris',
    createdAt: '2024-01-31T15:00:00Z',
  },
  {
    id: 18,
    title: 'Web Animations with CSS and JS',
    status: ArticleStatus.DRAFT,
    author: 'Paul Martin',
    createdAt: '2024-02-01T12:25:00Z',
  },
  {
    id: 19,
    title: 'Server-Side Rendering Explained',
    status: ArticleStatus.PUBLISHED,
    author: 'Quinn Davis',
    createdAt: '2024-02-02T09:50:00Z',
  },
  {
    id: 20,
    title: 'Building Real-time Applications',
    status: ArticleStatus.DRAFT,
    author: 'Rachel Miller',
    createdAt: '2024-02-03T14:10:00Z',
  },
];

let articles = [...mockArticles];

export function getNextId(): number {
  return nextId++;
}

export function getArticles(): Article[] {
  return [...articles];
}

export function setArticles(newArticles: Article[]): void {
  articles = newArticles;
}

export function resetArticles(): void {
  articles = [...mockArticles];
  nextId = 21;
}