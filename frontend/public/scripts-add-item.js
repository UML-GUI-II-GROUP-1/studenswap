import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase-init.js";

document.getElementById('add-item-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const condition = document.getElementById('item-condition').value;
    const description = document.getElementById('item-description').value;
    const imageFile = document.getElementById('item-image').files[0];
    const category = document.getElementById('item-category').value;

    const imageRef = ref(storage, `items/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Handle progress
        }, 
        (error) => {
            console.error('Error uploading file:', error);
        }, 
        async () => {
            const imagePath = `items/${imageFile.name}`;
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

            const newItem = {
                itemName,
                price: parseFloat(price),
                condition,
                description,
                imagePath,
                imageURL,
                category,
                sellerName: "John Doe", // Replace with dynamic seller info
                sellerEmail: "johndoe@student.uml.edu" // Replace with dynamic seller info
            };

            try {
                await addDoc(collection(db, "items"), newItem);
                alert('Item added successfully!');
                window.location.href = "inventory.html";
            } catch (e) {
                console.error('Error adding document: ', e);
            }
        }
    );
});
