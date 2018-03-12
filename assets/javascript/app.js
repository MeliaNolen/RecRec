// Google Places working API link: https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyDNykp8d0VE2_-cffhHst9m-ugdfkdatg8
// Google Geocoding working API link by zip: https://maps.googleapis.com/maps/api/geocode/json?address=28202&key=AIzaSyAadbTVL7TxCXH4u9v8RpRQAJWA0pcfp-8
// Google Geocoding working API link by "City, ST": https://maps.googleapis.com/maps/api/geocode/json?address=Charlotte,+NC&key=AIzaSyAadbTVL7TxCXH4u9v8RpRQAJWA0pcfp-8
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBq4IBq0xpD8bq9BF7iWYfij3Ac7jeTXbA",
  authDomain: "recrec-1520801014564.firebaseapp.com",
  databaseURL: "https://recrec-1520801014564.firebaseio.com",
  projectId: "recrec-1520801014564",
  storageBucket: "",
  messagingSenderId: "607701225820"
};
firebase.initializeApp(config);

var database = firebase.database();
var lat;
var long;
var geoAPI;
var placesAPI;
$(".submit").on("click", function (event) {

  event.preventDefault();
  var cityInput = $("#cityInput").val().trim();
  var stateInput = $("#stateInput").val().trim();
  console.log(cityInput);
  console.log(stateInput);


  geoAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityInput + ",+" + stateInput + "&key=AIzaSyAadbTVL7TxCXH4u9v8RpRQAJWA0pcfp-8";
  console.log(geoAPI);

  $.ajax({
    url: geoAPI,
    method: "GET"
  }).then(function (geoResponse) {
    console.log(geoResponse.results[0].formatted_address);
    console.log(geoResponse.results[0].geometry.location.lat);
    console.log(geoResponse.results[0].geometry.location.lng);

    lat = geoResponse.results[0].geometry.location.lat;
    long = geoResponse.results[0].geometry.location.lng;

    placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=50000&types=zoo&key=AIzaSyDNykp8d0VE2_-cffhHst9m-ugdfkdatg8";
    console.log(placesAPI);

    $.ajax({
      url: placesAPI,
      method: "GET"
    }).then(function (placesResponse) {
      console.log(placesResponse.results[0].rating);
    });

  });
});