/// <reference types="cypress" />
import LoginPage from '../support/pageObjects/LoginPage'

describe("Login", () => {
    const loginPage = new LoginPage();
    beforeEach("Visit login page", () => {
        loginPage.visitLoginPage();
    });

    it("Successful login with valid credentials", () => {
        loginPage.login('user@example.com', 'stringst');
        loginPage.assertLoginSuccessful();
    });

    it("Failed login with wrong email", () => {
        loginPage.login('hos2t@example.com', 'stringst');
        loginPage.assertErrorMessage('Invalid credentials');
    });

    it("Failed login with an empty email field", () => {
        loginPage.loginWithPassword('stringst');
        loginPage.assertErrorMessage('Email is required');
    });

    it("Failed login with wrong password", () => {
        loginPage.login('user@example.com', 'wrongpassword');
        loginPage.assertErrorMessage('Invalid credentials');
    });

    it("Failed login with an empty password field", () => {
        loginPage.loginWithEmail('user@example.com');
        loginPage.assertErrorMessage('Password is required');
    });
})