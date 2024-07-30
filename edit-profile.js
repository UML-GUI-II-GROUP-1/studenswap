document.getElementById('edit-profile-form').addEventListener('submit', function(event) // Adds an event listener to the form for the submit event
{
    event.preventDefault(); 

    
    const major = document.getElementById('major').value;// Retrieves the values of major, year, and campus from the form
    const year = document.getElementById('year').value;
    const campus = document.getElementById('campus').value;


    const profilePictureInput = document.getElementById('profile-picture'); // This will change the user's profile picture 
    const reader = new FileReader();
    
    
    reader.onload = function() 
    {
        const profilePicture = reader.result;
        localStorage.setItem('profilePicture', profilePicture);
    };
    
   
    if (profilePictureInput.files[0])  // If a new profile picture file is selected, read it as a data URL
        {
        reader.readAsDataURL(profilePictureInput.files[0]);
    }

    
    localStorage.setItem('major', major);  // Saves the major, year, and campus to localStorage
    localStorage.setItem('year', year);
    localStorage.setItem('campus', campus);

    
    
    window.location.href = 'profile.html'; // This will redirect to profile page once the edits are done
});


document.addEventListener('DOMContentLoaded', function() 
{
    // Retrieves stored values from localStorage or sets default values based on the users input
    const major = localStorage.getItem('major') || 'Computer Science';
    const year = localStorage.getItem('year') || 'junior';
    const campus = localStorage.getItem('campus') || 'north-campus';

    document.getElementById('major').value = major;
    document.getElementById('year').value = year;
    document.getElementById('campus').value = campus;
});
