Feature: Customizepage
  As a user
  I want to choose a color for the background
  So that I can personalize the app

  Background:
    Given the user is logged in
    And the user is on the customize page

  Scenario: Customizepage loads correctly
    Then the color picker is visible
    And the "RESET DATA" button is visible

  Scenario: Choose a color for the background
    When the user selects a color from the color picker
    Then the background color changes to the selected color
    And the color is saved in localStorage

  Scenario: Reset background to default color
    When the user clicks the "RESET DATA" button
    Then the background color resets to the default color
    And the color picker resets to the default color

  Scenario: Chosen color persists after reload
    Given the user has selected a custom background color
    When the user reloads the page
    Then the background color stays the same
    And the color picker shows the selected color

  Scenario: Customizepage stays on customize page after reload
    When the user reloads the page
    Then the user stays on the customize page
    And the color picker is still visible
    And the "RESET DATA" button is still visible