import { storage } from '../src/firebase-init';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const major = document.getElementById('major').value;
    const year = document.getElementById('year').value;
    const campus = document.getElementById('campus').value;

    const profilePictureInput = document.getElementById('profile-picture');
    const profilePictureFile = profilePictureInput.files[0];

    if (profilePictureFile) {
        const storageRef = ref(storage, 'profilePictures/' + profilePictureFile.name);
        const uploadTask = uploadBytesResumable(storageRef, profilePictureFile);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Handle progress
            }, 
            (error) => {
                console.error('Error uploading file:', error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    saveProfile(downloadURL, major, year, campus);
                });
            }
        );
    } else {
        saveProfile(null, major, year, campus);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const major = localStorage.getItem('major') || 'Computer Science';
    const year = localStorage.getItem('year') || 'Junior';
    const campus = localStorage.getItem('campus') || 'North Campus';

    document.getElementById('major').value = major;
    document.getElementById('year').value = year;
    document.getElementById('campus').value = campus;
});

function saveProfile(profilePictureURL, major, year, campus) {
    if (profilePictureURL) {
        localStorage.setItem('profilePicture', profilePictureURL);
    }
    localStorage.setItem('major', major);
    localStorage.setItem('year', year);
    localStorage.setItem('campus', campus);
    window.location.href = 'profile.html';
}
