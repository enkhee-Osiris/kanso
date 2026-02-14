// @ts-check

import { defineEcConfig } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export default defineEcConfig({
	themes: ['dracula', 'solarized-light'],
	shiki: {
		bundledLangs: ['astro', 'sass', 'typescript', 'css', 'html', 'bash', 'javascript'],
	},
	plugins: [pluginLineNumbers()],
});
