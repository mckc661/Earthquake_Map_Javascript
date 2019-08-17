function createMap(earthquakes) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Earthquakes": earthquakes    
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [37.09, -95.71],
    zoom: 3,
    // layers: [lightmap, earthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
// }

function createMarkers(response) {

  // Pull the "stations" property off of response.data
  var feature = response.features;

  // Initialize an array to hold bike markers
  var eqMarkers = [];

  // Loop through the stations array
  for (var index = 0; index < feature.length; index++) {
    var feature = feature[index];

    // For each station, create a marker and bind a popup with the station's name
    var eqMarker = L.marker([feature.geometry.coordinates])
      .bindPopup("<h3>" + feature.properties.place + "<h3><h3>Magnitude: " + feature.mag + "<h3>");

    // Add the marker to the bikeMarkers array
    eqMarkers.push(eqMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(eqMarkers)).addTo(Earthquakes);
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson", createMarkers);


// // Loop through locations and create city and state markers
// for (var i = 0; i < locations.length; i++) {
//   // Setting the marker radius for the state by passing population into the markerSize function
//   stateMarkers.push(
//     L.circle(locations[i].coordinates, {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "white",
//       radius: markerSize(locations[i].state.population)
//     })
//   );