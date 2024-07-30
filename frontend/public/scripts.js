document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async event => {
            event.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.status === 200) {
                    alert('Login successful!');
                    localStorage.setItem('token', data.token);
                } else {
                    alert(data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async event => {
            event.preventDefault();
            const firstname = signupForm.firstname.value;
            const lastname = signupForm.lastname.value;
            const email = signupForm.email.value;
            const password = signupForm.password.value;
            const confirmPassword = signupForm.confirmpassword.value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ firstname, lastname, email, password })
                });
                const data = await response.json();
                if (response.status === 201) {
                    alert('Signup successful! You can now log in.');
                    window.location.href = 'index.html';
                } else {
                    alert(data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});
