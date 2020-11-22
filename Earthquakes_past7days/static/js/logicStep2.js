// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  'Street': streets,
  'Satellite': satellite
};

// Create the map object with a center and zoom level. Preferred method for layers or background image
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//Having the tileLayer() method before accessing large datasets ensures that the map gets loaded before the data is added to it.
// Accessing the airport GeoJSON URL
let earthquake7days = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

//Style function
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// Grabbing our GeoJSON data.
d3.json(earthquake7days).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
  // We turn each feature into a circleMarker on the map.
   pointToLayer: function(feature, latlng) {
              console.log(data);
              return L.circleMarker(latlng);
   },
   // We set the style for each circleMarker using our styleInfo function.
   style: styleInfo
  }).addTo(map);
});
