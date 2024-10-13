// //Find event by city

// // <!DOCTYPE html>
// // <html lang="en">

// // <head>
// //   <meta charset="UTF-8">
// //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //   <title>Afro Events Search</title>
// // </head>

// // <body>
// //   <h1>Find Afro Events by City</h1>

// //   <input type="text" id="cityInput" placeholder="Enter city name">
// //   <button id="searchButton">Search for Afro Events</button>

// //   <div id="results"></div>

// //   <script>
// //     const searchButton = document.getElementById('searchButton');

// //     // Event listener for the search button
// //     searchButton.addEventListener('click', function () {
// //       const city = document.getElementById('cityInput').value.trim(); // Get input city

// //       if (city) {
// //         searchAfroEvents(city); // Call the search function
// //       } else {
// //         alert('Please enter a city name.');
// //       }
// //     });

// //     // Function to fetch and display events from the Ticketmaster API
// //     function searchAfroEvents(city) {
// //       const apiKey = 'M9XikQZGe69Zth1vtg7m88V58i2csv3r'; 
// //       const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=afro&city=${city}&apikey=${apiKey}`;

// //       fetch(url)
// //         .then(response => {
// //           if (!response.ok) {
// //             throw new Error(`HTTP error! Status: ${response.status}`);
// //           }
// //           return response.json(); // Parse the JSON response
// //         })
// //         .then(data => {
// //           if (data._embedded && data._embedded.events) {
// //             displayResults(data._embedded.events); 
// //           } else {
// //             document.getElementById('results').innerHTML = 'No events found.';
// //           }
// //         })
// //         .catch(error => {
// //           console.error('Error:', error);
// //           document.getElementById('results').innerHTML = 'Error fetching events. Please try again later.';
// //         });
// //     }

// //     // Function to display the event details on the webpage
// //     function displayResults(events) {
// //       const resultsDiv = document.getElementById('results');
// //       resultsDiv.innerHTML = ''; 

// //       events.forEach(event => {
// //         const venue = event._embedded.venues[0]; 

// //         const eventDiv = document.createElement('div');
// //         eventDiv.innerHTML = `
// //           <h3>${event.name}</h3>
// //           <p>Date: ${event.dates.start.localDate}</p>
// //           <p>Venue: ${venue.name}, ${venue.city.name}</p>
// //           <a href="${event.url}" target="_blank">More Info</a>
// //           <img src="${event.images[0].url}" alt="${event.name}" width="200">
// //           <hr>
// //         `;
// //         resultsDiv.appendChild(eventDiv); 
// //       });
// //     }
// //   </script>
// // </body>

// // </html>


// //search event by location search with google maps 


//html part
// //<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Events on a Map</title>
//     <link rel="stylesheet" type="text/css" href="style.css">
//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
// </head>
// <body>
//     <p id="location">Fetching your location...</p>
//     <div id="map"></div>
//     <div id="events"></div>
    
//     <script src="script.js"></script>
//     <script src="https://maps.googleapis.com/maps/api/js?key=googleapi&async=defer"></script>
// </body>
// </html>

//CSS part
// #map {
//     height: 400px;
//     width: 100%;
//     margin-bottom: 20px;
// }

// #events {
//     font-size: 16px;
//     padding: 10px;
// }

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//         document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

// javascript part
// // Function to display location and initialize API calls
// function showPosition(position) {
//     var locationElement = document.getElementById("location");
//     locationElement.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

//     var latlon = position.coords.latitude + "," + position.coords.longitude;

//     // Ticketmaster Discovery API call
//     $.ajax({
//         type: "GET",
//         url: "https://app.ticketmaster.com/discovery/v2/events.json",
//         data: {
//             apikey: "my",
//             latlong: latlon,
//             radius: 25, // 25 miles radius for events
//         },
//         async: true,
//         dataType: "json",
//         success: function(json) {
//             console.log(json);
//             var eventsElement = document.getElementById("events");
//             eventsElement.innerHTML = json.page.totalElements + " events found.";
//             showEvents(json);
//             initMap(position, json);
//         },
//         error: function(xhr, status, err) {
//             console.log(err);
//         }
//     });
// }

// // Function to show event list
// function showEvents(json) {
//     var eventsDiv = document.getElementById("events");
//     for (var i = 0; i < json.page.size; i++) {
//         if (json._embedded && json._embedded.events[i]) {
//             eventsDiv.innerHTML += "<p>" + json._embedded.events[i].name + "</p>";
//         }
//     }
// }

// // Function to initialize and display Google Map with event markers
// function initMap(position, json) {
// //     var mapDiv = document.getElementById('map');
// //     var map = new google.maps.Map(mapDiv, {
// //         center: { lat: position.coords.latitude, lng: position.coords.longitude },
// //         zoom: 10
// //     });

// //     // Add event markers to the map
// //     if (json._embedded && json._embedded.events) {
// //         json._embedded.events.forEach(function(event) {
// //             var eventLocation = {
// //                 lat: event._embedded.venues[0].location.latitude,
// //                 lng: event._embedded.venues[0].location.longitude
// //             };
// //             var marker = new google.maps.Marker({
// //                 position: eventLocation,
// //                 map: map,
// //                 title: event.name
// //             });
// //         });
// //     }
// // }

// // // Function to handle errors in geolocation
// // function showError(error) {
// //     var locationElement = document.getElementById("location");
// //     switch (error.code) {
// //         case error.PERMISSION_DENIED:
// //             locationElement.innerHTML = "User denied the request for Geolocation.";
// //             break;
// //         case error.POSITION_UNAVAILABLE:
// //             locationElement.innerHTML = "Location information is unavailable.";
// //             break;
// //         case error.TIMEOUT:
// //             locationElement.innerHTML = "The request to get user location timed out.";
// //             break;
// //         case error.UNKNOWN_ERROR:
// //             locationElement.innerHTML = "An unknown error occurred.";
// //             break;
// //     }
// // }

// // // Call getLocation when the page loads
// // window.onload = getLocation;


//youtube video watcher in website

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>YouTube Video Playlist</title>
// </head>
// <body>
//   <!-- Button to trigger videos -->
//   <button id="playButton">Play Music Videos</button>
  
//   <!-- YouTube video player container -->
//   <div id="player"></div>

//   <!-- Load the YouTube Iframe API -->
//   <script src="https://www.youtube.com/iframe_api"></script>

//   
//   <script>
//     // Array of video IDs
//     const videoPlaylist = [
//       'M7lc1UVf-VE', 
//       'dQw4w9WgXcQ',
//       'e-ORhEE9VVg'
//     ];
    
//     let player;
//     let currentVideoIndex = 0;

//     // This function creates the iframe player after the API script loads
//     function onYouTubeIframeAPIReady() {
//       player = new YT.Player('player', {
//         height: '390',
//         width: '640',
//         videoId: videoPlaylist[currentVideoIndex],
//         events: {
//           'onStateChange': onPlayerStateChange
//         }
//       });
//     }

//     // When the video ends, play the next video in the playlist
//     function onPlayerStateChange(event) {
//       if (event.data === YT.PlayerState.ENDED) {
//         currentVideoIndex++;
//         if (currentVideoIndex < videoPlaylist.length) {
//           player.loadVideoById(videoPlaylist[currentVideoIndex]);
//         }
//       }
//     }

//     // Play the first video in the playlist when the button is clicked
//     document.getElementById('playButton').addEventListener('click', function() {
//       player.loadVideoById(videoPlaylist[0]);
//     });
//   </script>
// </body>
// </html>
