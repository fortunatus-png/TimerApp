# 🐼 Study Panda

Full-stack study timer app with React frontend and FastAPI backend.

## Project Structure

- `/frontend` - React + Vite + Material UI
- `/backend` - FastAPI + Python + SQLite
- `/tests` - Playwright E2E tests with Gherkin-style BDD
- `/tests/api` - Playwright API tests for authentication and sessions
- `/tests/pageObjects` - Playwright Page Objects per feature area
- `/cypress` - Secondary Cypress E2E suite (POM practice)
- `/docs/gherkin` - Gherkin feature files for BDD scenarios
- `/docs/bug-reports` - Documented bug reports from QA testing

## Setup and Run

The recommended workflow is to run the full stack in Docker from the project root:

```bash
docker compose up -d --build
```

Services:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API docs: http://localhost:8000/docs

Run the end-to-end tests against the running stack:

```bash
npx playwright test --reporter=line
```

Run only the API tests against the running backend:

```bash
npx playwright test tests/api --reporter=line
```

Stop all services when you are done:

```bash
docker compose down
```

The SQLite database is persisted in a Docker volume (`db_data`).

For local development without Docker, see the separate backend and frontend setup sections below.

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- pip and npm package managers

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # (Linux/Mac) or venv\Scripts\activate (Windows)
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend
npm install
```

### Running Both Locally

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate   # (Linux/Mac) or venv\Scripts\activate (Windows)
fastapi dev
```

Then visit `http://localhost:8000` in your browser.

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then visit `http://localhost:5173` in your browser.

---

## Testing

This project uses **Playwright** with **BDD-style Gherkin** approach for end-to-end testing.

### Test Strategy (Portfolio Focus)

- Primary E2E framework: **Playwright**
- Secondary E2E framework: **Cypress** (kept as a lightweight POM showcase)
- CI quality gate is based on Playwright results

### Test Files
- `tests/api/signup.spec.js` - Registration endpoint tests and input validation
- `tests/api/login.spec.js` - Login endpoint tests and authentication errors
- `tests/api/auth.spec.js` - Current-user endpoint and bearer-token validation
- `tests/api/sessions.spec.js` - Session creation, listing, deletion, and authorization
- `tests/login.spec.js` - Login and authentication flows
- `tests/signup.spec.js` - User registration tests
- `tests/home.spec.js` - Home page navigation tests
- `tests/timer.spec.js` - Timer functionality tests
- `tests/session.spec.js` - Active session and pause/play tests
- `tests/account.spec.js` - Account page and logout tests
- `tests/customize.spec.js` - Customization and color picker tests
- `tests/history.spec.js` - History heatmap and month navigation tests
- `tests/testData.js` - Centralized test data and environment-based overrides
- `tests/pageObjects/*.js` - Page Object Model classes used by Playwright specs

### Gherkin Feature Files
- `docs/gherkin/login.feature` - Login scenarios
- `docs/gherkin/signup.feature` - Signup scenarios
- `docs/gherkin/home.feature` - Home page scenarios
- `docs/gherkin/timer.feature` - Timer scenarios
- `docs/gherkin/session.feature` - Active session scenarios
- `docs/gherkin/history.feature` - History page scenarios
- `docs/gherkin/customize.feature` - Customization scenarios
- `docs/gherkin/account.feature` - Account page scenarios

### Bug Reports
- `docs/bug-reports/bug-001-session-reload.md` - Session state/reload behavior issue
- `docs/bug-reports/bug-002-customize.md` - Customization flow issue
- `docs/bug-reports/bug-003-timer.md` - Timer behavior issue

### Running Tests Locally

Install Playwright dependencies:
```bash
npm install
npx playwright install
```

Run all tests:
```bash
npx playwright test --reporter=line
```

Run Cypress suite (optional):
```bash
npm run cy:run
```

The test suite runs serially in this project because the app uses a shared SQLite-backed Docker stack.

Run tests in headed mode (see browser):
```bash
npx playwright test --headed
```

Run specific test file:
```bash
npx playwright test tests/login.spec.js
```

Run a specific API test file:
```bash
npx playwright test tests/api/login.spec.js
```

API tests require the backend to be available at `http://localhost:8000`.
When running locally, start it in a separate terminal before running the tests:

```bash
cd backend
source venv/bin/activate   # (Linux/Mac) or venv\Scripts\activate (Windows)
fastapi dev
```

Run tests in debug mode:
```bash
npx playwright test --debug
```

### Test Coverage

The test suite covers:
- ✅ User authentication (login, signup, validation)
- ✅ Timer setup and countdown
- ✅ Session management (pause, resume, leave)
- ✅ Navigation between pages
- ✅ Page persistence after reload
- ✅ Form validation and error handling
- ✅ History heatmap functionality
- ✅ Customization features
- ✅ Account page and logout
- ✅ Bug documentation (3 real bugs found)

### CI/CD Testing

Tests run automatically in GitHub Actions for:
- Pushes to `main`/`master`
- Pull requests targeting `main`/`master`

There is also a manual workflow trigger for an optional non-blocking Cypress run. The main CI quality gate is Playwright (see `.github/workflows/playwright.yml`).

---

## Architecture Overview

### Frontend Flow
- React Router handles page navigation and route protection.
- After login, the auth token is stored in `localStorage` and protected routes require it.
- Timer settings are selected on the timer page, then passed into the session page.
- The session page saves completed (or partial) study time through backend API calls.
- History renders a monthly day/hour heatmap from saved sessions.

### Backend Flow
- FastAPI exposes auth and session endpoints.
- Passwords are hashed with `bcrypt`.
- Login creates a token that is stored in SQLite with an expiration timestamp.
- Protected endpoints validate bearer tokens and return only the current user's data.

### Why This Is Useful for QA / Testing Roles
- Clear end-to-end user flows (auth -> timer -> session -> history).
- Real API integration instead of mocked-only frontend tests.
- Deterministic CI setup with seeded test user and repeatable E2E execution.

---

## Features

- ⏱️ Countdown timer (5–180 min adjustable)
- 📊 Study history heatmap (hours 1-24, color-coded by intensity)
- 🎨 Customizable background color
- 🔐 Local authentication (signup / login with validation)
- ⚠️ Leave warning to prevent accidental session loss
- ✨ Sparkle effect and animated panda mascot

## Tech Stack

### Frontend
- Vite + React
- React Router DOM
- Material UI (MUI)
- localStorage for data persistence
- Playwright for E2E testing

### Backend
- FastAPI
- SQLite
- Python

## What I Practiced

- `useState` & `useEffect` for timer logic
- React Router (`useNavigate`, `useLocation`, nested routes)
- localStorage for data persistence
- CSS Flexbox & Grid
- SVG animations in React
- Playwright E2E testing with BDD approach
- Page Object Model pattern for test maintainability
- Writing professional bug reports

## What I Learned for the First Time

- Building a heatmap from real user data
- Passing complex state between pages
- Form validation with real-time error feedback
- Creating animated SVG characters (blinking, moving eyes)
- Playwright E2E testing with BDD approach
- Page Object Model pattern for test maintainability
- Writing professional bug reports (severity, priority, steps)

## Future Ideas

- Display detailed session data in table view
- Earn stars after completed sessions
- Spend stars on customization options (themes, accessories)
- Avatar builder (glasses, clothes, backgrounds)
- Repeat session button
- User profiles and study streaks
- Enhanced test coverage with Gherkin feature files

## Getting Started

Clone the repository:

```bash
git clone https://github.com/fortunatus-png/TimerApp.git
cd TimerApp
```

Then follow the [Setup and Run](#setup-and-run) section above.

---

## Screenshots

Screenshots are available in the [frontend README](./frontend/README.md).
