Feature: Historypage
  As a user
  I want to see the heatmap
  So that I can know how my study flow is

  Background:
    Given the user is logged in
    And the user is on the session page

  Scenario: Historypage loads correctly
    Then the heatmap is visible
    And the current month with year is visible
    And the study sessions with colors from pale green to dark green are visible

  Scenario: Navigeate through months
    When the user clicks "<" button
    Then the previous month is displayed

    When the user clicks ">" button
    Then the next month is displayed

  Scenario: Historypage stays on history page after reload
    When the user reloads the page
    Then the user stays on the histordy page
    And the heatmap is still visible
    And the current month with year is still visible
    And the study sessions with colors from pale green to dark green are still visible

  Scenario: Heatmap shows correct color for study time
    Given the user has completed a 25-minute session on a specific day
    When the user views the history page
    Then the cell for that day shows a medium green color
