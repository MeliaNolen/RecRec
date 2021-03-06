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
    $('select').material_select();


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

    $(".toggle-btn input[type=radio]").addClass("visuallyhidden");
            $(".toggle-btn input[type=radio]").change(function () {
                if ($(this).attr("name")) {
                    $(this).parent().addClass("success").siblings().removeClass("success")
                } else {
                    $(this).parent().toggleClass("success");
                }
            });
});

function initPlaces() {
    console.log("initializing Google Places Library");
}

function showResults() {
    $(window).scrollTop(0);
    var x = $(".activitiesContainer").show();
    var y = $(".weatherContainer").show();
    var a = $(".newSearchButton").html('<button class="btn-large waves-effect waves-light" type="submit" name="action">New Search</button>');
    var z = $(".formContainer").hide();

}


$(document).on("click", ".newSearchButton", function () {
    document.location.reload();
    $(window).scrollTop(0);
});


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
                    showResults();
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
                $(".generalWeather").append("<div class='gen'><p>" + generalCondition + "</p></div>");
                //removed <img id='icon' src=" + weatherIconLink + "><br>" +

            cloudCover = response.list[0].clouds.all;
            console.log("Cloud cover = " + cloudCover + "%");

            cityName = response.city.name
            console.log("City name = " + cityName)

             var rain = response.list[0].rain;
                var snow = response.list[0].snow;
                if (rain && Object.keys(rain).length) {
                    console.log("<div class='prec'>expected rain = " + rain["3h"] + "</div>")
                    if (rain["3h"] <= .25 && rain["3h"] > 0) {
                        $(".chanceOfRain").html("<div class='prec'>Low</div>");
                    } else if (rain["3h"] <= .9 && rain["3h"] > .25) {
                        $(".chanceOfRain").html("<div class='prec'>Moderate</div>");
                    } else if (rain["3h"] > .9) {
                        $(".chanceOfRain").html("<div class='prec'>High</div>");
                    }
                } else {
                    console.log("There is no rain in the forecast");
                    rain=0;
                    var rainOutput = "<div class='prec'>None</div>";
                    $(".chanceOfRain").append(rainOutput);
                }
                if (snow && Object.keys(snow).length) {
                    console.log("expected snow = " + snow["3h"])
                    $('changeToSnow').text('Snow');
                    if (snow["3h"] <= .25 && snow["3h"] > 0) {
                        $(".chanceOfRain").html("<div class='prec'>Low</div>");
                    } else if (snow["3h"] <= .9 && snow["3h"] > .25) {
                        $(".chanceOfRain").html("<div class='prec'>Moderate</div>");
                    } else if (snow["3h"] > .9) {
                        $(".chanceOfRain").html("<div class='prec'>High</div>");
                    }
                } else {
                    console.log("There is no snow in the forecast");
                    snow = 0;
                }



            wind = Math.round(response.list[0].wind.speed);
            console.log("Wind speed is " + wind + " mph");

            $('.selectedDay').append(cityName);

            maxTemperature = Math.round(response.list[0].main.temp_max);
            console.log("The high during your outing is predicted to be " + maxTemperature + "°F");


             minTemperature = Math.round(response.list[0].main.temp_min);
                avgTemperature = Math.round((maxTemperature + minTemperature)/2);
                console.log("The low during your outing is predicted to be " + minTemperature + "°F");
                $(".temperature").append("<div class='temp'>" + avgTemperature + "</div>");

                // Setting Indoor or Outdoor
                if ((rain + snow < .2) && (maxTemperature < 95) && (minTemperature > 45) && (wind < 20)) {
                    outdoor = true;
                    $('.recInOrOut').html('the outdoors.');
                    $('.inOrOut').html('<img width="138" src="./images/Outdoor_150px.png">')
                } else {
                    outdoor = false;
                    $('.recInOrOut').html('being indoors.');
                    $('.inOrOut').html('<img width="138"src="./images/Indoor_150px.png">')

                }
                console.log(outdoor);
                placesCall(lat, long);
            }


    });



};



    


    function placesCall(lat, long) {
        // The following is incomplete code that attempts to get rid of repetitivness 
        // It is not funcitonal but if time permits, it can be made funcitonal
        //
        // if (outdoor === true) {
        //     console.log("=============================");
        //     var outdoorArray = ["park", "zoo", "amusement_park"];
        //     var service = new google.maps.places.PlacesService($('.replaceMe').get(0));
        //     var activities = [];
            
        //     for (var i = 0; i < outdoorArray.length; i++) {
                
        //         service.nearbySearch({
        //             location: {
        //                 lat: lat,
        //                 lng: long
        //             },
        //             radius: 50000,
        //             type: outdoorArray[i]
        //         }, function (place, status) {
        //             if (status === google.maps.places.PlacesServiceStatus.OK) {
        //             }
        //             console.log(place);
                        
        //                 for (var j = 0; j < 3; ++j) {
        //                     var info =('<div> Name: ' + place[j].name + '</div>'+
        //                         '<div> Location: ' + place[j].vicinity + '</div>'+
        //                         '<div> Rating: ' + place[j].rating + '</div>');
        //                     //console.log(place[i].place_id);
        //                     //console.log(place[i].types);
                            
        //                    activities.push(info);
        //                 }
                    
        //             $(".activity0").html('<div class="collection"><a href="#!" class="collection-item">'+ activities[0]+'</a>' +
        //                 '<a href="#!" class="collection-item">'+activities[1]+'</a>'+
        //                 '<a href="#!" class="collection-item">'+activities[2]+'</a>'+
        //                 '</div>');
        //             $(".activity1").html('<div class="collection"><a href="#!" class="collection-item">'+ activities[3]+'</a>' +
        //                 '<a href="#!" class="collection-item">'+activities[4]+'</a>'+
        //                 '<a href="#!" class="collection-item">'+activities[5]+'</a>'+
        //                 '</div>');
        //             $(".activity2").html('<div class="collection"><a href="#!" class="collection-item">'+ activities[6]+'</a>' +
        //                 '<a href="#!" class="collection-item">'+activities[7]+'</a>'+
        //                 '<a href="#!" class="collection-item">'+activities[8]+'</a>'+
        //                 '</div>');
                    
        //         })  
                
        //     }
                    
        if (outdoor === true) {
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
                    resultsPark += ('<a href="#!" class="collection-item">'+'<div> Name: ' + place[i].name + '</div>'+
                    '<div> Location: ' + place[i].vicinity + '</div>'+
                    '<div> Rating: ' + place[i].rating + '</div>'+'</a>');
                    // console.log(place[i].place_id);
                    // console.log(place[i].types);
                }
                $('.activity0').append('<a class="collection-item"><h4>Parks</h4></a>'+resultsPark);
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
                    resultsZoo += ('<a href="#!" class="collection-item">'+'<div> Name: ' + place[i].name + '</div>'+
                    '<div> Location: ' + place[i].vicinity + '</div>'+
                    '<div> Rating: ' + place[i].rating + '</div>'+'</a>');
                    //console.log(place[i].place_id);
                    //console.log(place[i].types);
                }
                $('.activity1').append('<a class="collection-item"><h4>Zoos</h4></a>'+resultsZoo);
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
                    resultsAmu += ('<a href="#!" class="collection-item">'+'<div> Name: ' + place[i].name + '</div>'+
                    '<div> Location: ' + place[i].vicinity + '</div>'+
                    '<div> Rating: ' + place[i].rating + '</div>'+'</a>');
                    //console.log(place[i].place_id);
                    //console.log(place[i].types);
                }
                $('.activity2').append('<a class="collection-item"><h4>Amusement Parks</h4></a>'+resultsAmu);
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
                    resultsPark += ('<a href="#!" class="collection-item">'+'<div> Name: ' + place[i].name + '</div>'+
                    '<div> Location: ' + place[i].vicinity + '</div>'+
                    '<div> Rating: ' + place[i].rating + '</div>'+'</a>');
                    // console.log(place[i].place_id);
                    // console.log(place[i].types);
                }
                $('.activity0').append('<a class="collection-item"><h4>Libraries</h4></a>'+resultsPark);
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
                var resultsZoo = '';
                for (i = 0; i < 3; ++i) {
                    resultsZoo += ('<a href="#!" class="collection-item">'+'<div> Name: ' + place[i].name + '</div>'+
                    '<div> Location: ' + place[i].vicinity + '</div>'+
                    '<div> Rating: ' + place[i].rating + '</div>'+'</a>');
                    //console.log(place[i].place_id);
                    //console.log(place[i].types);
                }
                $('.activity1').append('<a class="collection-item"><h4>Museums</h4></a>'+resultsZoo);
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
                var resultsAmu = '';
                for (i = 0; i < 3; ++i) {
                    resultsAmu += ('<a href="#!" class="collection-item">'+'<div> Name: ' + place[i].name + '</div>'+
                    '<div> Location: ' + place[i].vicinity + '</div>'+
                    '<div> Rating: ' + place[i].rating + '</div>'+'</a>');
                    //console.log(place[i].place_id);
                    //console.log(place[i].types);
                }
                $('.activity2').append('<a class="collection-item"><h4>Malls</h4></a>'+resultsAmu);
            })
        };

    };






$(document).on("click", ".collection-item", function(){
    if ($(this).attr("class") === "collection-item") {
        $(this).attr("class", "collection-item active");
    }
    else {
        $(this).attr("class", "collection-item");
    }
})

// Smooth scrolling element
// Not needed anymore because of hide and show functions
// $(document).on("click", 'a[href*="#"]:not([href="#"])', function () {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
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
// Not needed anymore
// $(document).on("click", ".newSearchButton", function () {
//     $(".generalWeather").text("");
//     $(".chanceOfRain").text("");
//     $(".temperature").text("");
// });
