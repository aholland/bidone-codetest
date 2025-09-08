/**
 * Type definitions for test-specific window properties
 */

// Augment the global Window interface for tests
declare global {
  interface Window {
    __APP_READY__?: boolean;
    __SEARCH_IN_PROGRESS__?: boolean;
    __SEARCH_COMPLETE__?: boolean;
    __LAST_SEARCH_QUERY__?: string;
  }
}

export {};