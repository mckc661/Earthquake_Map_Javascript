var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

var map = L.map("map-id", {
center: [37.09, -95.71],
zoom: 3,
// layers: [lightmap, earthquakes]
});
lightmap.addTo(map);
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson", function(data){

    var feature = data.features;

  // Initialize an array to hold bike markers
    var eqMarkers = [];

  // Loop through the stations array
    for (var index = 0; index < feature.length; index++) {
    var feature = feature[index];

    // // For each station, create a marker and bind a popup with the station's name
    // var eqMarker = L.marker([feature.geometry.coordinates])
    //   .bindPopup("<h3>" + feature.properties.place + "<h3><h3>Magnitude: " + feature.mag + "<h3>");

    // // Add the marker to the bikeMarkers array
    eqMarkers.push(eqMarker);
    console.log(eqMarkers)
  }

//   // Create a layer group made from the bike markers array, pass it into the createMap function
//   createMap(L.layerGroup(eqMarkers)).addTo(Earthquakes);
});

