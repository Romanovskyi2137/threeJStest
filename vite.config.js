import { defineConfig } from 'vite';

export default defineConfig({
    // base: '/threeJSTest/',
    esbuild: {
        target: 'esnext' // top-level await
    }
});