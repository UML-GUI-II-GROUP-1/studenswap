import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDO6YTCMytep4T2ahryhOQAaVTgIn_u9tw",
    authDomain: "student-afc9a.firebaseapp.com",
    projectId: "student-afc9a",
    storageBucket: "student-afc9a.appspot.com",
    messagingSenderId: "564840812734",
    appId: "1:564840812734:web:77f30fd32a7baa6cc34eef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Logged in successfully');
        })
        .catch((error) => {
            alert(error.message);
        });
});

document.getElementById('forgotPasswordLink').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('resetPasswordContainer').style.display = 'block';
});

document.getElementById('resetPasswordForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const resetEmail = document.getElementById('resetEmail').value;

    sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
            alert('Password reset email sent');
            document.getElementById('resetPasswordContainer').style.display = 'none';
            document.getElementById('loginContainer').style.display = 'block';
        })
        .catch((error) => {
            alert(error.message);
        });
});

document.getElementById('backToLoginLink').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('resetPasswordContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});
