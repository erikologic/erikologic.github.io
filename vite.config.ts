import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	plugins: [sveltekit(), enhancedImages(),  purgeCss()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
