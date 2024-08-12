document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async event => {
            event.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                alert('Login successful!');
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Error:', error);
                alert('Error logging in: ' + error.message);
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
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;
                await user.updateProfile({ displayName: `${firstname} ${lastname}` });
                await user.sendEmailVerification();
                alert('Signup successful! Please verify your email.');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Error:', error);
                alert('Error signing up: ' + error.message);
            }
        });
    }
});
