/**
 * @jest-environment jsdom
 */

// filepath: c:\Users\101557\vscode-workspace\expense-tracker\src\scripts\login.test.js
const { validateUsername, validatePassword, checkCredentials } = require('./login');

describe('Login Validation', () => {
    describe('validateUsername', () => {
        it('should return false for empty username', () => {
            expect(validateUsername('')).toBe(false);
        });
        it('should return true for non-empty username', () => {
            expect(validateUsername('user')).toBe(true);
        });
    });

    describe('validatePassword', () => {
        it('should fail for password less than 8 chars', () => {
            expect(validatePassword('Ab1@')).toBe(false);
        });
        it('should fail for password without uppercase', () => {
            expect(validatePassword('password@1')).toBe(false);
        });
        it('should fail for password without lowercase', () => {
            expect(validatePassword('PASSWORD@1')).toBe(false);
        });
        it('should fail for password without number', () => {
            expect(validatePassword('Password@')).toBe(false);
        });
        it('should fail for password without special character', () => {
            expect(validatePassword('Password1')).toBe(false);
        });
        it('should pass for valid password', () => {
            expect(validatePassword('Password@1')).toBe(true);
        });
    });

    describe('checkCredentials', () => {
        it('should return true for correct credentials', () => {
            expect(checkCredentials('user', 'Password@123')).toBe(true);
        });
        it('should return false for incorrect username', () => {
            expect(checkCredentials('wrong', 'Password@123')).toBe(false);
        });
        it('should return false for incorrect password', () => {
            expect(checkCredentials('user', 'WrongPass1!')).toBe(false);
        });
    });
});