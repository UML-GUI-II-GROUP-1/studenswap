document.addEventListener('DOMContentLoaded', function() {
    const addItemForm = document.getElementById('addItemForm');

    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const category = document.getElementById('category').value;
        const itemName = document.getElementById('itemName').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;
        const image = document.getElementById('image').files[0];

        // Perform form validation (if necessary)

        // Create an item object
        const item = {
            category,
            itemName,
            description,
            price,
            quantity,
            imageURL: URL.createObjectURL(image)
        };

        // Simulate adding the item to the inventory
        addToInventory(item);

        // Reset the form
        addItemForm.reset();

        alert('Item added successfully!');
    });

    function addToInventory(item) {
        // Retrieve the current inventory from local storage or initialize an empty array
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

        // Add the new item to the inventory
        inventory.push(item);

        // Save the updated inventory back to local storage
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }
});
