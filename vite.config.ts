import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import ssr from 'vite-plugin-ssr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), ssr()],
});
