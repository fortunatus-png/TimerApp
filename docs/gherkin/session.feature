Feature: Sessionpage
  As a user
  I want to see the countdown timer
  So that I can focus during this session on my study

  Background:
    Given the user is on the session page

  Scenario: Sessionpage loads correctly
    Then the countdown timer is visible
    And the panda with book is visible

  Scenario: Pause the countdown timer
    When the user clicks the "⏸" button
    Then the countdown timer stops

  Scenario: Resume the countdown timer
    Given the countdown timer is paused
    When the user clicks the "▶" button
    Then the countdown timer resumes

  Scenario: Warning message when leaving the page during active session
    When the user clicks the the menu
    Then the user sees a warning message: "Your progress so far will be saved, but you won't be able to continue this session later."
    And the "CONTINUE" button is visible
    And the "LEAVE" button is visible

  Scenario: Continue session after warning
    Given the warning message is displayed
    When the user clicks the "CONTINUE" button
    Then the warning message disappears
    And the countdown timer continues

  Scenario: Leave session after warning
    Given the warning message is displayed
    And the user clicked a menu item before the warning appeared
    When the user clicks the "LEAVE" button
    Then the user is redirected to the page they originally selected
    And the session is saved in the history

  Scenario: Session saves after timer finishes
    When the countdown timer reaches "0:00"
    Then the message "🎉 Great job! You studied for X minutes!" is visible
    And "START NEW SESSION" button is visible

  Scenario: Start new session after completion
    Given the countdown timer has reached "0:00"
    And the "🎉 Great job! You studied for X minutes!" message is visible
    When the user clicks the "START NEW SESSION" button
    Then the user is redirected to the timer page
