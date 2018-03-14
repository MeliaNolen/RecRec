//javascript for front-end
$(document).ready(function(){

    //Set variable for State Abbreviation drop-down menu
    var stateList = [
    "AK", "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH","NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ]

    for (i = 0; i < stateList.length; i++) { 
        $("select").append("<option value="+ stateList[i] +">" +stateList[i] + "</option>");
    }

   /// $("body").css("background-image").parallax({url: '../icons/gplaypattern.png'});

});


// Open Weather API
$(document).on("click", ".submitButton", function() {
    event.preventDefault();
    
    var lat;
    var long;
    var geoAPI;
    var cityInput = $("#city").val().trim();
    var stateInput = $(".state").val().trim();

    console.log(cityInput);
    console.log(stateInput);


    geoAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityInput + ",+" + stateInput + "&key=AIzaSyAadbTVL7TxCXH4u9v8RpRQAJWA0pcfp-8";
    console.log(geoAPI);

    $.ajax({
        url: geoAPI,
        method: "GET",
        success: function (response) {
        console.log(response.results[0].formatted_address);
        console.log(response.results[0].geometry.location.lat);
        console.log(response.results[0].geometry.location.lng);

        lat = response.results[0].geometry.location.lat;
        long = response.results[0].geometry.location.lng;
        
        
        }
    });
    
    console.log(lat);
    
    
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long +
      "&units=imperial&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET",
      success: function(response) {
        console.log(response);
    
        weatherIcon = response.list[0].weather[0].icon;
        var weatherIconLink = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        console.log(weatherIconLink);

        generalCondition = response.list[0].weather[0].main;
        console.log("Overall conditions = " + generalCondition);
        $(".generalWeather").html("<img id='icon' src=" + weatherIconLink + "><br>" +
                "<p>" + generalCondition + "</p>");

        cloudCover = response.list[0].clouds.all;
        console.log("Cloud cover = " + cloudCover +"%");

        cityName = response.city.name
        console.log("City name = " + cityName)     

        var rain = response.list[0].rain;
        var snow = response.list[0].snow;
        if ( rain && Object.keys(rain).length ) {
            console.log("expected rain = " + rain["3h"])
            $(".chanceOfRain").html(rain["3h"]);
        } else{
            console.log("There is no rain in the forecast");
            rain = 0;
            $(".chanceOfRain").html(rain);
        }
        if (snow && Object.keys(snow).length ) {
            console.log("expected snow = " + snow["3h"])
        } else{
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
        if ((rain + snow < .2) && (maxTemperature < 95) && (minTemperature > 45) && (wind < 20)){
            var outdoor = true;
          } else {
            var outdoor = false;
          }
          console.log(outdoor);
        }
    });
});



 // Smooth scrolling element
$(document).on("click", 'a[href*=#]:not([href=#])', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});


// Clearing the weather elements if you want a new search
$(document).on("click", ".newSearchButton", function() {
    $(".generalWeather").text("");
    $(".chanceOfRain").text("");
    $(".temperature").text("");
});

// Google Places API 

    //=============================
    // Alex's code
    //=============================