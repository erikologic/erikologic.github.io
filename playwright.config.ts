import { defineConfig } from '@playwright/test';

const host = '127.0.0.1';
const port = 4322;
const baseURL = `http://${host}:${port}`;

export default defineConfig({
	testDir: './tests/e2e',
	use: {
		baseURL,
		trace: 'retain-on-failure',
	},
	webServer: {
		command: `npm run preview -- --host ${host} --port ${port}`,
		env: { ASTRO_PREVIEW_BACKGROUND: '0' },
		url: baseURL,
	},
});
