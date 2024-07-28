import { fileURLToPath, URL } from 'node:url';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// Load environment variables from .env file
dotenv.config();

export default defineConfig({
	plugins: [
		vue(),
		// AutoImport({
		//   resolvers: [ElementPlusResolver()],
		// }),
		// Components({
		//   resolvers: [ElementPlusResolver()],
		// }),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	define: {
		'process.env': {
			API_URL: JSON.stringify(process.env.VITE_API_URL),
		},
	},
});
