import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
            base: process.env.NODE_ENV === "production" ? "/image-lineage-ui" : "",
        },
		prerender: { entries: [] }
	}
};

export default config;
