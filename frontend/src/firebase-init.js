// Import the functions from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbx5at7008hg25c49ySLYybi6G8RKWOS4",
  authDomain: "studentswap-25f2c.firebaseapp.com",
  projectId: "studentswap-25f2c",
  storageBucket: "studentswap-25f2c.appspot.com",
  messagingSenderId: "685918859206",
  appId: "1:685918859206:web:794e0bf5feae83941b8cc7",
  measurementId: "G-32H1CHJ41X"
};

// Initialize Firebase to use
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
