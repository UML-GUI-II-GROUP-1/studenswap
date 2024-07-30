document.addEventListener('DOMContentLoaded', function() 
{
    // Retrieves stored values from localStorage, or sets default values if none are found
    const profileName = localStorage.getItem('profileName') || 'John Doe';

    document.querySelector('.user-name').textContent = profileName;// Set the user's name in the top right of header
});
