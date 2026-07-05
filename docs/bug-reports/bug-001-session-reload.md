# Session page -> Timer restarts from beginning after page reload

**Severity:** High
**Priority:** High

**Description:**
When the user reloads the session page during an active timer, the timer resets to the original duration instead of continuing from where it left off.

## Steps to Reproduce
1. Log in to the app
2. Start a new session (e.g., 5-minute timer)
3. Wait for 10 seconds (timer shows 4:50)
4. Reload the page (F5 or Ctrl+R)
5. Observe the timer

## Expected Behavior
The timer should continue from 4:50 (where it was before reload)

## Actual Behavior
The timer resets to 5:00 (original duration)

## Environment
- Browser: Firefox (latest)
- OS: Ubuntu

