// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDO6YTCMytep4T2ahryhOQAaVTgIn_u9tw",
    authDomain: "student-afc9a.firebaseapp.com",
    projectId: "student-afc9a",
    databaseURL: "https://student-afc9a-default-rtdb.firebaseio.com",
    storageBucket: "student-afc9a.appspot.com",
    messagingSenderId: "564840812734",
    appId: "1:564840812734:web:77f30fd32a7baa6cc34eef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

export { app, auth, database, db };

// Check if the user is logged in and update navbar
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userProfileLink = document.getElementById('userProfileLink');
        const profileName = document.getElementById('profileName');

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            profileName.textContent = `${userData.firstName} ${userData.lastName}`;
        } else {
            profileName.textContent = "Profile";
        }

        userProfileLink.href = "profile.html";
    } else {
        window.location.href = 'login.html';
    }
});

function handleSignOut() {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error("Error signing out: ", error);
        alert("Error signing out. Please try again.");
    });
}

document.getElementById('sign-out-button').addEventListener('click', handleSignOut);
