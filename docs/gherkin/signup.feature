Feature: Signup
  As a new user
  I want to sign up with my email and password
  So that I can access Study Panda

  Background:
    Given the user is on the login page

  Scenario: Successful signup with valid credentials
    When the user enters a valid email and password
    And clicks the "SIGN UP" button
    Then the user is redirected to the home page

  Scenario: Failed signup with invalid email format
    When the user enters an invalid email format
    And enters a valid password
    And clicks the "SIGN UP" button
    Then the user sees an error message "Enter a valid email (e.g., name@domain.com)"

  Scenario: Failed signup with an empty email field
    When the user leaves the email field empty
    And enters a valid password
    And clicks the "SIGN UP" button
    Then the user sees an error message "Email is required"

  Scenario: Failed signup with email that already exists
    And an account with this email already exists
    When the user enters this email and a password
    And clicks the "SIGN UP" button
    Then the user sees an error message "Email already exists"

  Scenario: Failed signup with password too short
    When the user enters a valid email
    And enters a password with less than 8 characters
    And clicks the "SIGN UP" button
    Then the user sees an error message "Password must be at least 8 characters"

  Scenario: Failed signup with an empty password field
    When the user enters a valid email
    And leaves the password field empty
    And clicks the "SIGN UP" button
    Then the user sees an error message "Password is required"
