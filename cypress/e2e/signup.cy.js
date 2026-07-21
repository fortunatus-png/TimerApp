/// <reference types="cypress" />
import SignupPage from '../support/pageObjects/SignupPage'

describe("Signup", () => {
    const signupPage = new SignupPage();
    beforeEach("Visit login page", () => {
        signupPage.visitSignupPage();
    });

    it("Successful signup with valid credentials", () => {
        signupPage.signup('pomuser@example.com', 'stringst');
        signupPage.assertSignupSuccessful();
    });

    it("Failed signup with invalid email format", () => {
        signupPage.signup('host.com', 'stringst');
        signupPage.assertErrorMessage('Enter a valid email (e.g., name@domain.com)');
    });

    it("Failed signup with an empty email field", () => {
        signupPage.signupWithPassword('stringst');
        signupPage.assertErrorMessage('Email is required');
    });

    it("Failed signup with email that already exists", () => {
        signupPage.signup('pomuser@example.com', 'stringst');
        signupPage.assertErrorMessage('Email already exists');
    });

    it("Failed signup with password too short", () => {
        signupPage.signup('pomuser@example.com', 'string');
        signupPage.assertErrorMessage('Password must be at least 8 characters');
    });

    it("Failed signup with an empty password field", () => {
        signupPage.signupWithEmail('host@example.com');
        signupPage.assertErrorMessage('Password is required');
    });
})