/* eslint-disable */
import { defineConfig, devices } from '@playwright/test';
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../Backend/.env") });

export default defineConfig({
    // Point Playwright strictly to your dedicated E2E directory
    testDir: './e2e',

    // Maximum time one test can run before timing out
    timeout: 30 * 1000,

    // Run assertions in parallel for maximum execution speed
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: !!process.env.CI,

    use: {
        // Base URL to use in actions like `await page.goto('/')`
        baseURL: 'http://localhost:5173',

        // Capture trace only when a test fails for post-mortem debugging
        trace: 'on-first-retry',

        // Take screenshots automatically only upon failure
        screenshot: 'only-on-failure',
    },

    // Configure major browser test projects
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

    /* Automatically spin up your local dev servers before starting tests */
    webServer: [
        {
            command: 'npm run dev',
            url: 'http://localhost:5173',
            reuseExistingServer: !process.env.CI,
            timeout: 60 * 1000,
        },
        {
            // Adjust this path/command if your backend sits in a separate terminal workspace
            command: 'node ../Backend/server.js',
            url: 'http://localhost:5000',
            reuseExistingServer: !process.env.CI,
            timeout: 60 * 1000,
            env: {
                NODE_ENV: 'test',
                PORT: '5000',
                MONGO_URI: process.env.MONGO_URI || "",
            },
        },
    ],
});