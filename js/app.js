//javascript for front-end
$(document).ready(function () {
$(".modal").modal()
    //Set variable for State Abbreviation drop-down menu
    var stateList = [
        "AK", "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ]

    for (i = 0; i < stateList.length; i++) {
        $("select").append("<option value=" + stateList[i] + ">" + stateList[i] + "</option>");
    }


    var day0 = moment().format('dddd, MMMM Do');
    var day1 = moment().add(1, 'days').format('dddd, MMMM Do');
    var day2 = moment().add(2, 'days').format('dddd, MMMM Do');
    var day3 = moment().add(3, 'days').format('dddd, MMMM Do');
    var day4 = moment().add(4, 'days').format('dddd, MMMM Do');

    console.log(day0);

    $(".day0").html("Today");
    $(".day1").html(day1);
    $(".day2").html(day2);
    $(".day3").html(day3);
    $(".day4").html(day4);
});

function initPlaces() {
    console.log("initializing Google Places Library");
}



// When user clicks submit
$(document).on("click", ".submitButton", function () {
    event.preventDefault();

    var lat;
    var long;
    var geoAPI;
    var cityInput = $("#city").val().trim();
    var stateInput = $(".state").val();
    var outdoor;

    console.log(cityInput);
    console.log(stateInput);

    if (!cityInput || stateInput === null) {
        console.log("error heard")
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
        $("#modal1").modal("open");
        return;
    } else {
        geoAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityInput + ",+" + stateInput + "&key=AIzaSyAadbTVL7TxCXH4u9v8RpRQAJWA0pcfp-8";
        console.log(geoAPI);

        $.ajax({
            url: geoAPI,
            method: "GET",
            success: function (response) {
                console.log(typeof response.status)
                if (response.status === "ZERO_RESULTS") {
                    console.log("error heard")
                    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
                    $("#modal2").modal("open");
                    return;
                } else {

                console.log(response.results[0].formatted_address);
                console.log(response.results[0].geometry.location.lat);
                console.log(response.results[0].geometry.location.lng);

                lat = response.results[0].geometry.location.lat;
                long = response.results[0].geometry.location.lng;

                WeatherCall(lat, long)

            }
        }
    })
}


});

function WeatherCall(lat, long) {
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long +
        "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (response) {
            console.log(response);

            var weatherIcon = response.list[0].weather[0].icon;
            var weatherIconLink = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
            console.log(weatherIconLink);

            generalCondition = response.list[0].weather[0].main;
            console.log("Overall conditions = " + generalCondition);
            $(".generalWeather").html("<img id='icon' src=" + weatherIconLink + "><br>" +
                "<p>" + generalCondition + "</p>");

            cloudCover = response.list[0].clouds.all;
            console.log("Cloud cover = " + cloudCover + "%");

            cityName = response.city.name
            console.log("City name = " + cityName)

            var rain = response.list[0].rain;
            var snow = response.list[0].snow;
            if (rain && Object.keys(rain).length) {
                console.log("expected rain = " + rain["3h"])
                $(".chanceOfRain").html(rain["3h"]);
            } else {
                console.log("There is no rain in the forecast");
                rain = 0;
                $(".chanceOfRain").html(rain);
            }
            if (snow && Object.keys(snow).length) {
                console.log("expected snow = " + snow["3h"])
            } else {
                console.log("There is no snow in the forecast");
                snow = 0;
            }


            wind = Math.round(response.list[0].wind.speed);
            console.log("Wind speed is " + wind + " mph");

            maxTemperature = Math.round(response.list[0].main.temp_max);
            console.log("The high during your outing is predicted to be " + maxTemperature + "°F");


            minTemperature = Math.round(response.list[0].main.temp_min);
            console.log("The low during your outing is predicted to be " + minTemperature + "°F");
            $(".temperature").html("High: " + maxTemperature + "Low: " + minTemperature);

            // Setting Indoor or Outdoor
            if ((rain + snow < .2) && (maxTemperature < 95) && (minTemperature > 45) && (wind < 20)) {
                outdoor = true;
            } else {
                outdoor = false;
            }
            console.log(outdoor);
            placesCall(lat, long);
        }


    });


};


function placesCall(lat, long) {
    if (outdoor === true) {
        console.log("=============================");
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
            $('.activity1').append(resultsPark + '<br><br>');
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
            $('.activity2').append(resultsZoo + '<br><br>');
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
            $('.activity3').append(resultsAmu + '<br><br>');
        })
    }
    else {
        console.log("=============================");
        var service = new google.maps.places.PlacesService($('.replaceMe').get(0));

        service.nearbySearch({
            location: {
                lat: lat,
                lng: long
            },
            radius: 50000,
            type: 'library'
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
            $('.activity1').append(resultsPark + '<br><br>');
        })
        service.nearbySearch({
            location: {
                lat: lat,
                lng: long
            },
            radius: 50000,
            type: 'shopping_mall'
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
            $('.activity2').append(resultsZoo + '<br><br>');
        })
        service.nearbySearch({
            location: {
                lat: lat,
                lng: long
            },
            radius: 50000,
            type: 'museum'
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
            $('.activity3').append(resultsAmu + '<br><br>');
        })
    };
};







// Smooth scrolling element
// $(document).on("click", 'a[href*=#]:not([href=#])', function () {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
//         || location.hostname == this.hostname) {

//         var target = $(this.hash);
//         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//         if (target.length) {
//             $('html,body').animate({
//                 scrollTop: target.offset().top
//             }, 1000);
//             return false;
//         }
//     }
// });


// Clearing the weather elements if you want a new search
$(document).on("click", ".newSearchButton", function () {
    $(".generalWeather").text("");
    $(".chanceOfRain").text("");
    $(".temperature").text("");
});

// Google Places API 

    //=============================
    // Alex's code
    //=============================