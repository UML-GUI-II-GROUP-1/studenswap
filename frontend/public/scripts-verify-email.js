import { auth } from '../src/firebase-init.js';
import { applyActionCode, checkActionCode } from 'firebase/auth';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode');

    if (!oobCode) {
        document.getElementById('message').textContent = 'Invalid or missing verification code.';
        return;
    }

    checkActionCode(auth, oobCode)
        .then(() => {
            applyActionCode(auth, oobCode)
                .then(() => {
                    document.getElementById('message').textContent = 'Email verification successful.';
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('message').textContent = 'An error occurred. Please try again later.';
                });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Invalid or expired verification code.';
        });
});
