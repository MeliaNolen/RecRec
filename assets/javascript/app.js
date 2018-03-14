// Google Places working API link: https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyDNykp8d0VE2_-cffhHst9m-ugdfkdatg8
// Google Geocoding working API link by zip: https://maps.googleapis.com/maps/api/geocode/json?address=28202&key=AIzaSyAadbTVL7TxCXH4u9v8RpRQAJWA0pcfp-8
// Google Geocoding working API link by "City, ST": https://maps.googleapis.com/maps/api/geocode/json?address=Charlotte,+NC&key=AIzaSyAadbTVL7TxCXH4u9v8RpRQAJWA0pcfp-8
// var placesAPI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=50000&types=zoo&key=AIzaSyDNykp8d0VE2_-cffhHst9m-ugdfkdatg8";

function initPlaces() {
  console.log("initializing");
}

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

var day0 = moment().format('dddd, MMMM Do');
var day1 = moment().add(1, 'days').format('dddd, MMMM Do');
var day2 = moment().add(2, 'days').format('dddd, MMMM Do');
var day3 = moment().add(3, 'days').format('dddd, MMMM Do');
var day4 = moment().add(4, 'days').format('dddd, MMMM Do');

console.log(day0);

$(".day0").html(day0);
$(".day1").html(day1);
$(".day2").html(day2);
$(".day3").html(day3);
$(".day4").html(day4);

$(".submit").on("click", function (event) {

  event.preventDefault();
  var cityInput = $("#city").val().trim();
  var stateInput = $("#state").val().trim();
  console.log(cityInput);
  console.log(stateInput);


  geoAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityInput + ",+" + stateInput + "&key=AIzaSyAadbTVL7TxCXH4u9v8RpRQAJWA0pcfp-8";
  console.log(geoAPI);

  $.ajax({
    url: geoAPI,
    method: "GET"
  }).then(function (response) {
    console.log(response.results[0].formatted_address);
    console.log(response.results[0].geometry.location.lat);
    console.log(response.results[0].geometry.location.lng);

    lat = response.results[0].geometry.location.lat;
    long = response.results[0].geometry.location.lng;
    
    // this moment() should be one of the variables dayX but format('X');
    var tZoneTime = moment().format('X');

    var tZoneAPI = "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + long + "&timestamp=" + tZoneTime + "&key=AIzaSyDh_fHwPbmZyEQ47-ZHdZAwleiG4LMIiGs";
    console.log(tZoneAPI);
    $.ajax({
        url: tZoneAPI,
        method: "GET"
    }).then(function (zoneResponse) {
        console.log(zoneResponse.dstOffset + zoneResponse.rawOffset);
    })

    var service = new google.maps.places.PlacesService($('.replaceMe').get(0));

        service.nearbySearch({
            location: {
                lat: lat,
                lng: long
            },
            radius: 50000,
            type: 'park'
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
            }
            console.log(place);

            var resultsPark = '';
            for (i = 0; i < 3; ++i) {
                resultsPark += '<div> Name: ' + place[i].name + '</div>';
                resultsPark += '<div> Location: ' + place[i].vicinity + '</div>';
                resultsPark += '<div> Rating: ' + place[i].rating + '</div>';
                //console.log(place[i].place_id);
                //console.log(place[i].types);
            }
            $('.activityContent').append(resultsPark + '<br><br>');
        })
        service.nearbySearch({
            location: {
                lat: lat,
                lng: long
            },
            radius: 50000,
            type: 'zoo'
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
            }
            console.log(place);
            var resultsZoo = '';
            for (i = 0; i < 3; ++i) {
                resultsZoo += '<div> Name: ' + place[i].name + '</div>';
                resultsZoo += '<div> Location: ' + place[i].vicinity + '</div>';
                resultsZoo += '<div> Rating: ' + place[i].rating + '</div>';
                //console.log(place[i].place_id);
                //console.log(place[i].types);
            }
            $('.activityContent').append(resultsZoo + '<br><br>');
        })
        service.nearbySearch({
            location: {
                lat: lat,
                lng: long
            },
            radius: 50000,
            type: 'amusement_park'
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
            }
            console.log(place);
            var resultsAmu = '';
            for (i = 0; i < 3; ++i) {
                resultsAmu += '<div> Name: ' + place[i].name + '</div>';
                resultsAmu += '<div> Location: ' + place[i].vicinity + '</div>';
                resultsAmu += '<div> Rating: ' + place[i].rating + '</div>';
                //console.log(place[i].place_id);
                //console.log(place[i].types);
            }
            $('.activityContent').append(resultsAmu + '<br><br>');
        })
  });
  
});