# 🐼 Study Panda

Full-stack study timer app with React frontend and FastAPI backend.

## Project Structure

- `/frontend` - React + Vite + Material UI
- `/backend` - FastAPI + Python + SQLite
- `/tests` - Playwright E2E tests with Gherkin-style BDD
- `/docs/gherkin` - Gherkin feature files for BDD scenarios
- `/docs/bug-reports` - Documented bug reports from QA testing

## Setup (First Time Only)

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- pip and npm package managers

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
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
source venv/bin/activate
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

### Test Files
- `tests/login.spec.js` - Login and authentication flows
- `tests/signup.spec.js` - User registration tests
- `tests/home.spec.js` - Home page navigation tests
- `tests/timer.spec.js` - Timer functionality tests
- `tests/session.spec.js` - Active session and pause/play tests
- `tests/account.spec.js` - Account page and logout tests
- `tests/customize.spec.js` - Customization and color picker tests
- `tests/history.spec.js` - History heatmap and month navigation tests
- `tests/studyPandaPage.js` - Page Object Model for reusable test utilities

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
- `docs/bug-reports/bug-001-timer-reload.md` - Timer resets on page reload
- `docs/bug-reports/bug-002-color-picker.md` - Color picker stays visible after navigation
- `docs/bug-reports/bug-003-countdown-hover.md` - Countdown text hover effect

### Running Tests Locally

Install Playwright dependencies:
```bash
npm install
npx playwright install
```

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode (see browser):
```bash
npx playwright test --headed
```

Run specific test file:
```bash
npx playwright test tests/login.spec.js
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

Tests run automatically on every push via GitHub Actions (see `.github/workflows/playwright.yml`).  
The status badge at the top shows the current test status.

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

---

## Author

Built as a hands-on project to refresh and expand React, FastAPI, and testing skills.
