export const AUTH = {
    email: Cypress.env('E2E_USER_EMAIL') || 'user@example.com',
    password: Cypress.env('E2E_USER_PASSWORD') || 'stringst',
};

export const SIGNUP = {
    defaultPassword: Cypress.env('E2E_SIGNUP_PASSWORD') || 'stringst',
    existingEmail: Cypress.env('E2E_SIGNUP_EXISTING_EMAIL') || 'pomuser@example.com',
};

export function uniqueEmail(prefix = 'pomuser') {
    const timestamp = Date.now();
    return `${prefix}+${timestamp}@example.com`;
}
