Feature: Login
  As a user
  I want to log in with my email and password
  So that I can access my study sessions

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters a valid email and password
    And clicks the "LOG IN" button
    Then the user is redirected to the home page

  Scenario: Failed login with wrong email
    Given the user is on the login page
    When the user enters a wrong email and a valid password
    And clicks the "LOG IN" button
    Then the user sees an error message

  Scenario: Failed login with wrong password
    Given the user is on the login page
    When the user enters a valid email and a wrong password
    And clicks the "LOG IN" button
    Then the user sees an error message

  Scenario: Failed login with an empty email field
    Given the user is on the login page
    When the user lets the email field empty and enters a valid password
    And clicks the "LOG IN" button
    Then the user sees an error message

  Scenario: Failed login with an empty password field
    Given the user is on the login page
    When the user lets the password field empty and enters a valid password
    And clicks the "LOG IN" button
    Then the user sees an error message