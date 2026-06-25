Feature: Homepage
  As a user
  I want to use the home page as my starting point
  So that I can navigate to other features

  Background:
    Given the user is logged in
    And the user is on the home page

  Scenario: Homepage loads correctly
    Then the page title is visible
    And the panda mascot is visible
    And the welcome message "Small steps, big results!" is visible

  Scenario: Navigate to Timer page
    When the user clicks "Timer" in the menu
    Then the user is redirected to the timer page
    And the timer page is visible

  Scenario: Navigate to History page
    When the user clicks "History" in the menu
    Then the user is redirected to the history page
    And the history page is visible

  Scenario: Navigate to Account page
    When the user clicks "Account" in the menu
    Then the user is redirected to the account page
    And the user sees their email address

  Scenario: Navigate to Customization page
    When the user clicks "Customize" in the menu
    Then the user is redirected to the customization page
    And the color picker is visible

  Scenario: Homepage stays on home page after reload
    When the user reloads the page
    Then the user stays on the home page
    And the panda mascot is still visible