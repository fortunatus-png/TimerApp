Feature: Accountpage
  As a user
  I want to log out from Study Panda
  So that I can be sure for my account

  Background:
    Given the user is logged in
    And the user is on the account page

  Scenario: Accountpage loads correctly
    Then the "LOG OUT" button is visible
    And the email adddress is visible

  Scenario: Log out is possible
    When the user clicks the "LOG OUT" button
    Then the login page appears

  Scenario: Accountpage stays on account page after reload
    When the user reloads the page
    Then the "LOG OUT" button is still visible
    And the email adddress is still visible
