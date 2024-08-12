import { db } from '../src/firebase-init.js';
import { collection, addDoc } from 'firebase/firestore';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!validateEmail(email)) {
            alert('Please enter a valid email.');
            return;
        }

        addDoc(collection(db, 'contacts'), {
            name: name,
            email: email,
            subject: subject,
            message: message
        })
        .then(() => {
            alert('Message sent successfully');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
