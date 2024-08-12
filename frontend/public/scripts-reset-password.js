import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

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

// Reset Password function
window.resetPassword = function() {
    const email = document.getElementById('email').value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Password reset email sent! Check your inbox.');
        })
        .catch((error) => {
            alert(error.message);
        });
}
