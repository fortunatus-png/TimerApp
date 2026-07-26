export const AUTH = {
  email: process.env.E2E_USER_EMAIL || 'ye@example.com',
  password: process.env.E2E_USER_PASSWORD || 'stringst',
};

export const LOGIN = {
  wrongEmail: process.env.E2E_WRONG_EMAIL || 'miau@example.com',
  wrongPassword: process.env.E2E_WRONG_PASSWORD || 'stringss',
  empty: '',
};

export const SIGNUP = {
  existingEmail: process.env.E2E_SIGNUP_EXISTING_EMAIL || AUTH.email,
  validPassword: process.env.E2E_SIGNUP_PASSWORD || AUTH.password,
  shortPassword: 'string',
  invalidEmail: 'yeexample.com',
  empty: '',
};

export function uniqueEmail(prefix = 'new-user') {
  return `${prefix}-${Date.now()}@example.com`;
}
