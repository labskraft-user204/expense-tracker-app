// Validation functions
function validateUsername(username) {
    return !!(username && username.trim().length > 0);
}

function validatePassword(password) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    return passwordRegex.test(password);
}

function checkCredentials(username, password) {
    // Demo credentials (replace with real check as needed)
    const validUsername = 'user';
    const validPassword = 'Password@123';
    return username === validUsername && password === validPassword;
}

// Only run DOM code if we're in a browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value;
                const errorMsg = document.getElementById('errorMsg');
                errorMsg.textContent = '';

                // Username validation
                if (!validateUsername(username)) {
                    errorMsg.textContent = 'Username is required.';
                    return;
                }

                // Password validation
                if (!validatePassword(password)) {
                    errorMsg.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';
                    return;
                }

                if (checkCredentials(username, password)) {
                    window.location.href = 'index.html';
                } else {
                    errorMsg.textContent = 'Invalid username or password.';
                }
            });
        }
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateUsername,
        validatePassword,
        checkCredentials
    };
}