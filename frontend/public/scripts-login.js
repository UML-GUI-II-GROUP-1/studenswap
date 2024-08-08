import { auth } from '../src/firebase-init';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const resetPasswordContainer = document.getElementById('resetPasswordContainer');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const loginContainer = document.getElementById('loginContainer');
    const umlEmailButton = document.getElementById('umlEmailButton');

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
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Password reset email sent!');
                })
                .catch(error => {
                    console.error('Error sending reset email:', error);
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
            signInWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    alert('Login successful!');
                    window.location.href = 'index.html';
                })
                .catch(error => {
                    console.error('Error logging in:', error);
                    alert('An error occurred. Please try again later.');
                });
        } else {
            alert('Please enter a valid email (ending with student.uml.edu) and a password that meets the required criteria.');
        }
    });

    umlEmailButton.addEventListener('click', function() {
        window.location.href = "https://www.uml.edu/myuml/";
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
