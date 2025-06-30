document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = '';

    // Username validation
    if (!username) {
        errorMsg.textContent = 'Username is required.';
        return;
    }

    // Password validation
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char, 1 alphanumeric
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMsg.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, number, special character, and alphanumeric.';
        return;
    }

    // Demo credentials (replace with real check as needed)
    const validUsername = 'user';
    const validPassword = 'Password@123';

    if (username === validUsername && password === validPassword) {
        window.location.href = 'index.html';
    } else {
        errorMsg.textContent = 'Invalid username or password.';
    }
});