<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { SvelteTheme } from 'svelte-themes';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SvelteTheme themes={['system', 'light', 'dark', 'bidfood']} defaultTheme="system" />
{@render children?.()}
