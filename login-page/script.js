document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const spinner = document.getElementById('spinner');
    const responseMessage = document.getElementById('responseMessage');

    emailError.textContent = '';
    passwordError.textContent = '';
    responseMessage.textContent = '';

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email || !emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email.';
        return;
    }

    if (!password || password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        return;
    }

    spinner.style.display = 'block';

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
    })
    .then(response => {
        spinner.style.display = 'none';
        if (response.ok) {
            responseMessage.style.color = 'green';
            responseMessage.textContent = 'Login successful!';
        } else {
            responseMessage.style.color = 'red';
            responseMessage.textContent = 'Login failed. Please try again.';
        }
    })
    .catch(error => {
        spinner.style.display = 'none';
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'An error occurred. Please try again.';
    });
});

document.getElementById('showPassword').addEventListener('change', function () {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});
