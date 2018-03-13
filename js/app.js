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

    //==============================
$(".submitButton").on("click", function() {
    
    var lat = 35.2271;
    var long = -80.8431;
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long +
      "&units=imperial&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
    
        weatherIcon = response.list[0].weather[0].icon;
        var weatherIconLink = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        console.log(weatherIconLink);
        $(".generalWeather").append("<img src=" + weatherIconLink + ">");

        generalCondition = response.list[0].weather[0].main;
        console.log("Overall conditions = " + generalCondition);
        $(".generalWeather").append(generalCondition);

        cloudCover = response.list[0].clouds.all;
        console.log("Cloud cover = " + cloudCover +"%");

        cityName = response.city.name
        console.log("City name = " + cityName)     

        var rain = response.list[0].rain;
        var snow = response.list[0].snow;
        if ( rain && Object.keys(rain).length ) {
            console.log("expected rain = " + rain["3h"])
            $(".chanceOfRain").append(rain);
        } else{
            console.log("There is no rain in the forecast");
            $(".chanceOfRain").append("0");
        }
        if ( snow && Object.keys(snow).length ) {
            console.log("expected snow = " + snow["3h"])
        } else{
            console.log("There is no snow in the forecast");
        }
        
        wind = Math.round(response.list[0].wind.speed);
        console.log("Wind speed is " + wind + " mph");
        
        maxTemperature = Math.round(response.list[0].main.temp_max);
        console.log("The high during your outing is predicted to be " + maxTemperature + "°F");
        $(".temperature").append("High: " + maxTemperature);
        
        minTemperature = Math.round(response.list[0].main.temp_min);
        console.log("The low during your outing is predicted to be " + minTemperature + "°F");
        $(".temperature").append("Low: " + minTemperature);
    });
    //==============================

    
});

// Google Places API 

    //=============================
    // Alex's code
    //=============================