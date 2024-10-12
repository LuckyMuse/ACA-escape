// document.getElementById('searchButton').addEventListener('click', function() {
//     const city = document.getElementById('city').value;
//     if (city) {
//         searchEvents(city);
//     } else {
//         alert('Please enter a city.');
//     }
// });

// // Function to search events using Eventbrite API
// function searchEvents(city) {
//     const token = 'SXWJ2XNZTF2BQCHY5KVL'; // Replace with your Eventbrite Personal OAuth Token
//     const africanCaribbeanKeywords = 'African,Caribbean'; // Keywords for filtering events
//     const apiUrl = `https://www.eventbriteapi.com/v3/events/search/?q=${africanCaribbeanKeywords}&location.address=${city}&token=${token}`;

//     // Fetch events from Eventbrite API
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => displayEvents(data.events))
//         .catch(error => console.error('Error fetching data:', error));
// }

// // Function to display events
// function displayEvents(events) {
//     const eventResultsDiv = document.getElementById('printList');
//     eventResultsDiv.innerHTML = ''; // Clear previous results

//     if (events.length === 0) {
//         eventResultsDiv.innerHTML = '<p>No events found for this city.</p>';
//         return;
//     }

//     // Create a card for each event
//     events.forEach(event => {
//         const eventCard = document.createElement('div');
//         eventCard.className = 'event-card';

//         const eventTitle = document.createElement('div');
//         eventTitle.className = 'event-title';
//         eventTitle.textContent = event.name.text;

//         const eventDetails = document.createElement('div');
//         eventDetails.className = 'event-details';
//         eventDetails.innerHTML = `
//             <p><strong>Start:</strong> ${new Date(event.start.local).toLocaleString()}</p>
//             <p><strong>Venue:</strong> ${event.venue ? event.venue.name : 'TBD'}</p>
//             <p><strong>Description:</strong> ${event.description.text ? event.description.text.substring(0, 200) + '...' : 'No description available'}</p>
//             <a href="${event.url}" target="_blank">View Event Details</a>
//         `;

//         eventCard.appendChild(eventTitle);
//         eventCard.appendChild(eventDetails);
//         eventResultsDiv.appendChild(eventCard);
//     });
// }
