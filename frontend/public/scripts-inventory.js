document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const listingsContainer = document.getElementById('item-list');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const conditionCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const applyFiltersButton = document.querySelector('.applyfilters');

    // Load items from local storage
    let items = JSON.parse(localStorage.getItem('inventory')) || [];
    displayItems(items);

    // Apply filters only when the button is clicked
    applyFiltersButton.addEventListener('click', function() {
        applyFilters();
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

    function displayItems(items) {
        listingsContainer.innerHTML = '';

        items.forEach(item => {
            const itemElement = document.createElement('a');
            itemElement.href = 'listing.html';
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
});