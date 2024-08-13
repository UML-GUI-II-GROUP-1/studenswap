import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', async function() {
    const searchInput = document.getElementById('search');
    const listingsContainer = document.getElementById('item-list');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const conditionCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const applyFiltersButton = document.querySelector('.applyfilters');
    const categoryButtons = document.querySelectorAll('.category-btn');

    let items = [];

    async function fetchItems() {
        const querySnapshot = await getDocs(collection(db, "items"));
        querySnapshot.forEach(async (doc) => {
            const itemData = doc.data();
            const imageRef = ref(storage, itemData.imagePath);
            const imageURL = await getDownloadURL(imageRef);

            items.push({
                ...itemData,
                imageURL
            });
        });

        displayItems(items);
    }

    searchInput.addEventListener('input', applyFilters);
    applyFiltersButton.addEventListener('click', applyFilters);
    categoryButtons.forEach(button => button.addEventListener('click', function() {
        filterByCategory(button.getAttribute('data-category'));
    }));

    // New event listener to handle Enter key press in the search input
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action
            applyFilters();
        }
    });

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : 0;
        const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : Infinity;

        const selectedConditions = Array.from(conditionCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const filteredItems = items.filter(item => {
            const matchesSearch = item.itemName.toLowerCase().includes(searchTerm);
            const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
            const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(item.condition);

            return matchesSearch && matchesPrice && matchesCondition;
        });

        displayItems(filteredItems);
    }

    function filterByCategory(category) {
        const filteredItems = category === 'all' ? items : items.filter(item => item.category === category);
        displayItems(filteredItems);
    }

    function displayItems(items) {
        listingsContainer.innerHTML = '';

        items.forEach(item => {
            const itemElement = document.createElement('a');
            itemElement.href = 'listing.html?id=' + item.id;
            itemElement.classList.add('listing-item');
            itemElement.dataset.name = item.itemName;
            itemElement.dataset.condition = item.condition;
            itemElement.dataset.price = item.price;

            itemElement.innerHTML = `
                <div class="listing-image" style="background-image: url('${item.imageURL}');"></div>
                <div class="listing-info">
                    <h2>${item.itemName}</h2>
                    <p>$${item.price}</p>
                </div>
            `;

            listingsContainer.appendChild(itemElement);
        });
    }

    fetchItems();
});