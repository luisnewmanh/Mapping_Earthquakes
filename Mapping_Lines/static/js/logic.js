// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// Create the map object with a center and zoom level. Preferred method for layers or background image
//let map = L.map("mapid", {
  //  center: [
    //  40.7, -94.5
    //],
    //zoom: 4
//});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
accessToken: API_KEY
});
    
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Coordinates for each point to be used in the line.
let line = [
  [37.6152, -122.3900],
  [39.8493, -104.6738],
  [30.1900, -97.6687],
  [43.6777, -79.6248],
  [40.6418, -73.7810]
];

//create line between coordinates
L.polyline(line,{
  color:'blue',
  weight: 4,
  opacity: .5,
  dashArray:'10, 10'
}).addTo(map);


