import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {},
		supportFile: false,
	},
	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
	},
});
