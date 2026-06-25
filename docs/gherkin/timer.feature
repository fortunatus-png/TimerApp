Feature: Timerpage
  As a user
  I want to set up the timer
  So that I can access countdown timer to study

  Background:
    Given the user is on the timer page

  Scenario: Timerpage loads correctly
    Then the range slider is visible
    And the "START" button is visible
    And the panda mascot is visible
    And the minute diplay shows the current time

  Scenario: Set up the time with range slider
    When the user drags the range slider
    Then the minute display updates accordingly

  Scenario: Start the timer with the minimum time
    Given the range slider is set to 5 minutes
    When the user clicks the "START" button
    Then the user is redirected on the session page
    And the countdown timer is visible
    And the panda with book is visible

  Scenario: Start the timer with the maximum time
    Given the range slider is set to 180 minutes
    When the user clicks the "START" button
    Then the user is redirected on the session page
    And the countdown timer is visible

  Scenario: Timerpage stays on timer page after reload
    When the user reloads the page
    Then the user stays on the timer page
    And the range slider is still visible
    And the "START" button is still visible
    And the panda mascot is still visible
