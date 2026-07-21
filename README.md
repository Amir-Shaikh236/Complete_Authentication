# Complete_Authentication

DisasterWatch is a robust full-stack web application designed for real-time disaster monitoring, user notification preferences, and location telemetry tracking. Built using a layered Node.js/Express REST backend and a modern React/Vite frontend.

---

## 🏛️ Key Architectural Features

### 🛡️ Backend Engineering
* **Modern ES Module Architecture:** Unified `import`/`export` paradigm.
* **Security First:** Implements `Helmet` headers, `CORS` origin restrictions, `HttpOnly` + `SameSite=Strict` refresh token cookies, and password masking.
* **Session Management & Refresh Token Rotation:** Advanced security pipeline detecting compromised token reuse to wipe hijacked sessions automatically.
* **Isolated Testing Matrix:** Fully isolated integration test suite leveraging **Vitest**, **Supertest**, and **MongoDB Memory Server** for fast, local in-memory DB testing.

### 🎨 Frontend Engineering
* **Vite + React:** Rapid HMR build tooling and component-driven architecture.
* **State & Form Management:** React Hook Form combined with **Zod** schema validation.
* **UI & Styling:** Tailwind CSS primitives with accessible ARIA landmarks.

---

## 🚀 Quickstart Guide

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher
* **MongoDB**: Local instance or MongoDB Atlas Connection string

---

### 1️⃣ Local Backend Setup

```bash
# Navigate to Backend folder
cd Backend

# Install dependencies
npm install

# Configure Environment Variables
cp .env.example .env

# Run Integration Tests
npm run test

# Start Development Server
npm run start
