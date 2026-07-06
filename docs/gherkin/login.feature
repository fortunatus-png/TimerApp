Feature: Login
  As a user
  I want to log in with my email and password
  So that I can access my study sessions

  Background:
    Given the user is on the login page

  Scenario: Successful login with valid credentials
    When the user enters a valid email and password
    And clicks the "LOG IN" button
    Then the user is redirected to the home page

  Scenario: Failed login with wrong email
    When the user enters a wrong email and a valid password
    And clicks the "LOG IN" button
    Then the user sees an error message

  Scenario: Failed login with wrong password
    When the user enters a valid email and a wrong password
    And clicks the "LOG IN" button
    Then the user sees an error message

  Scenario: Failed login with an empty email field
    When the user lets the email field empty and enters a valid password
    And clicks the "LOG IN" button
    Then the user sees an error message

  Scenario: Failed login with an empty password field
    When the user lets the password field empty and enters a valid password
    And clicks the "LOG IN" button
    Then the user sees an error message