// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// Test flags on window object
	interface Window {
		__APP_READY__?: boolean;
		__SEARCH_IN_PROGRESS__?: boolean;
		__SEARCH_COMPLETE__?: boolean;
		__LAST_SEARCH_QUERY__?: string;
	}
}

export {};
