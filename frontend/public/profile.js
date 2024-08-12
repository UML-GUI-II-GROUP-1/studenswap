import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

function loadUserProfile() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Get the user's profile data from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();

                document.getElementById('profile-name').textContent = `${userData.firstName} ${userData.lastName}`;
                document.getElementById('profile-major').textContent = `Major: ${userData.major}`;
                document.getElementById('profile-year').textContent = `Year: ${userData.year}`;
                document.getElementById('profile-campus').textContent = `Campus: ${userData.campus}`;
            } else {
                console.error("No such document!");
            }
        } else {
            // No user is signed in, redirect to login page
            window.location.href = 'login.html';
        }
    });
}

window.addEventListener('load', loadUserProfile);
