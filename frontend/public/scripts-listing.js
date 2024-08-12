import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    
    if (!itemId) {
        console.error("No item ID found in the URL.");
        return;
    }

    const itemDoc = await getDoc(doc(db, "items", itemId));
    if (!itemDoc.exists()) {
        console.error("No such item!");
        return;
    }

    const itemData = itemDoc.data();
    const imageRef = ref(storage, itemData.imagePath);
    const imageURL = await getDownloadURL(imageRef);

    document.querySelector('.search-bar h2').textContent = itemData.itemName;
    document.querySelector('.search-bar h3').textContent = `$${itemData.price}`;
    document.querySelector('.description p').textContent = itemData.description;
    document.querySelector('.seller-info p').textContent = itemData.sellerName;
    document.querySelector('.contact-info p').textContent = itemData.sellerEmail;
    document.querySelector('.condition p').textContent = itemData.condition;
    document.querySelector('.listing img').src = imageURL;
});
