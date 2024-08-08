import { auth } from '../src/firebase-init';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!validateEmail(email)) {
            alert('Please enter a valid email (ending with student.uml.edu).');
            return;
        }

        if (!validatePassword(password)) {
            alert('Password must be at least 8 characters long and include uppercase, lowercase, and numeric characters.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                alert('Registration successful. Please verify your email.');
                sendEmailVerification(userCredential.user);
                window.location.href = 'login.html';
            })
            .catch(error => {
                console.error('Error signing up:', error);
                alert('An error occurred. Please try again later.');
            });
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
