document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const resetPasswordContainer = document.getElementById('resetPasswordContainer');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const loginContainer = document.getElementById('loginContainer');

    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.style.display = 'none';
        resetPasswordContainer.style.display = 'flex';
    });

    backToLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        resetPasswordContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
    });

    resetPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('resetEmail').value;

        if (validateEmail(email)) {
            fetch('/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
        } else {
            alert('Please enter a valid email (ending with student.uml.edu).');
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (validateEmail(email) && validatePassword(password)) {
            fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Login successful') {
                    window.location.href = 'index.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
        } else {
            alert('Please enter a valid email (ending with student.uml.edu) and a password that meets the required criteria.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@student\.uml\.edu$/;
        return re.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        return re.test(password);
    }
});
