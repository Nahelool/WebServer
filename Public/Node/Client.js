import Functions from '../Node/database.js'; 

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('volunteerForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const volunteerId = document.getElementById('volunteerId').value;
    const volunteerName = document.getElementById('volunteerName').value;

    // Call the server-side function to handle the API request
    try {
      await Functions.VolSignup(volunteerId, volunteerName /*, ... other form values */);
      console.log('Volunteer information submitted successfully.');
    } catch (error) {
      console.error('Error submitting volunteer information:', error);
    }
  });
});
