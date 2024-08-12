import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDO6YTCMytep4T2ahryhOQAaVTgIn_u9tw",
    authDomain: "student-afc9a.firebaseapp.com",
    databaseURL: "https://student-afc9a-default-rtdb.firebaseio.com",
    projectId: "student-afc9a",
    storageBucket: "student-afc9a.appspot.com",
    messagingSenderId: "564840812734",
    appId: "1:564840812734:web:77f30fd32a7baa6cc34eef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Register function
window.register = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const major = document.getElementById('major').value;
    const year = document.getElementById('year').value;
    const campus = document.getElementById('campus').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Save user data to Firebase Database
            set(ref(database, 'users/' + user.uid), {
                email: email,
                firstName: firstName,
                lastName: lastName,
                major: major,
                year: year,
                campus: campus,
                last_login: Date.now()
            });

            alert('User Created');
            window.location.href = 'login.html';
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Login function
window.login = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = 'inventory.html';
        })
        .catch((error) => {
            alert(error.message);
        });
}
