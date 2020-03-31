

var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue")

var place = document.getElementById("place");

var degrees = document.getElementById("degrees");
var humy = document.getElementById("hum");
var windspeed = document.getElementById("windy");
var UVp = document.getElementById("UV");

var searched = document.getElementById("searchedCity");

// button.addEventListener("click", function(){
$(document).ready(function () {
    $("#subBtn").on("click", function () {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&appid=974d902c878dcae370e669f524ad6ba0&units=imperial")
            .then(response => response.json())
            .then(data => {

                var placeValue = data["name"];

                var degreesValue = data["main"]["temp"];
                var humValue = data["main"]["humidity"];
                var windValue = data["wind"]["speed"];
                // var UVValue = data["main"]["humidity"];

                place.innerHTML = placeValue;
                degrees.innerHTML = "Temperature: " + degreesValue + "° F";
                humy.innerHTML = "Humidity: " + humValue + "%";
                windspeed.innerHTML = "Wind Speed: " + windValue + " kpr";

                // UVp.innerHTML = "UV: " + UVValue;
                
                $("#searchedCity").prepend("<br><hr>" + placeValue);
                
            })
            

    });
   

});

//     $("#random-button").on("click", function() {

//       // Create a string which will hold the lottery number
//       var lottoNumber = "";

//       // Then initiate a loop to generate 9 separate numbers
//       for (var i = 0; i < 9; i++) {

//         // For each iteration, generate a new random number between 0 and 9.
//         var random = Math.floor(Math.random() * 10);

//         // Take this number and then add it to the rest of the string.
//         // In essence, we are iteratively building a string of numbers. (e.g. First: 1, Second: 13, Third: 135, etc.)
//         lottoNumber = random + lottoNumber;

//       }

//       // ... and then dump the random number into our random-number div.
//       $("#random-number").prepend("<br><hr>" + lottoNumber);

//     });

//   });


//----------------------------------------------------------------
//experimenting with Bujumbura code also check out movieJSONdump

// var inputValue = document.querySelector(".inputValue")
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=974d902c878dcae370e669f524ad6ba0"

//     // Here we run our AJAX call to the OpenWeatherMap API

// button.addEventListener("click", function(){

//     $.ajax ({
//     url: queryURL,
//     method: "GET"
// })

// .then(function(response){

//     $("#city").html("<h1>" + response.name + "</h1>");
//     $("#wind").text("Wind Speed: " + response.wind.speed);
// })
// });