/// <reference types="cypress" />
import LoginPage from '../support/pageObjects/LoginPage'
import { AUTH } from '../support/testData'

describe("Login", () => {
    const loginPage = new LoginPage();
    beforeEach("Visit login page", () => {
        loginPage.visitLoginPage();
    });

    it("Successful login with valid credentials", () => {
        loginPage.login(AUTH.email, AUTH.password);
        loginPage.assertLoginSuccessful();
    });

    it("Failed login with wrong email", () => {
        loginPage.login('hos2t@example.com', AUTH.password);
        loginPage.assertErrorMessage('Invalid credentials');
    });

    it("Failed login with an empty email field", () => {
        loginPage.loginWithPassword(AUTH.password);
        loginPage.assertErrorMessage('Email is required');
    });

    it("Failed login with wrong password", () => {
        loginPage.login(AUTH.email, 'wrongpassword');
        loginPage.assertErrorMessage('Invalid credentials');
    });

    it("Failed login with an empty password field", () => {
        loginPage.loginWithEmail(AUTH.email);
        loginPage.assertErrorMessage('Password is required');
    });
})