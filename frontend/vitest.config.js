/* eslint-disable */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

    test: {
        // 1. Emulate browser DOM environment inside Node
        environment: 'jsdom',

        // 2. Glob pattern without space anomalies (supports js, jsx, ts, tsx)
        include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],

        // 3. Exclude dependency boundaries
        exclude: ['**/node_modules/**', '**/e2e/**'],

        // 4. Global setup file to import custom DOM matchers (@testing-library/jest-dom)
        setupFiles: ['./src/tests/setup.js'],

        // 5. Expose Vitest globals (describe, it, expect) without needing manual imports in every test file
        globals: true,
    },
});