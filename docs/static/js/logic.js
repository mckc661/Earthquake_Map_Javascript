// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function to pick color of magnitude

function magColor (value) {
  return  value >5 ? 'Yellow':
          value >4 ? 'Orange':
          value >3 ? 'Red':
          value >2 ? 'Cyan':
          value >1 ? 'LightGreen':
              "LightBlue"
              ;
}

// function to pick radius of circle based on radius

function getRadius (value) {
  return value * 3
}



// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
console.log (earthquakeData)
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  // function onEachFeature(feature, layer) {

    // var geojsonMarkerOptions = {
    //   radius: getRadius(),
    //   fillColor: magColor(),
    //   color: "#000",
    //   weight: .5,
    //   fillOpacity: 0.8
    // };
    
    var earthquakes = L.geoJSON(earthquakeData, {
      
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {
          radius: getRadius(feature.properties.mag),
          fillColor: magColor(feature.properties.mag),
          color: "#000",
          weight: .5,
          fillOpacity: 0.7
        })
      },
      onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.geometry.coordinates +
      "</h3><hr><p>" + feature.properties.place  + "<h3><h3>Magnitude: " + feature.properties.mag + "<h3>")
    }}
    );

   
  // }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  // var earthquakes = L.geoJSON(earthquakeData, {
  //   onEachFeature: onEachFeature
  // });
console.log(earthquakes)
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map-id", {
    center: [
      37.09, -95.71
    ],
    zoom: 3,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

