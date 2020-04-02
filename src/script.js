

var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue")

var place = document.getElementById("place");

var degrees = document.getElementById("degrees");
var humy = document.getElementById("hum");
var windspeed = document.getElementById("windy");
var UVp = document.getElementById("UV");

var searched = document.getElementById("searchedCity");

var historyArray = [];

// button.addEventListener("click", function(){
$(document).ready(function () {
    $("#subBtn").on("click", function () {
    var city = inputValue.value;
    searchWeather(city);    
    searchFiveDay(city);        

    });
    $("#searchedCity").on("click", "h5", function(){
        searchWeather($(this).text());
        searchFiveDay(city);
    })

    //SEARCH DAILY WEATHER FUNCTION

   function searchWeather(city) {
       fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=974d902c878dcae370e669f524ad6ba0&units=imperial")
            .then(response => response.json())
            .then(data => {

                var placeValue = data["name"];

                var degreesValue = data["main"]["temp"];
                var humValue = data["main"]["humidity"];
                var windValue = data["wind"]["speed"];
                // var UVValue = data["main"]["humidity"];

                place.innerHTML = placeValue + " ( " + new Date().toLocaleDateString() + " )";
                degrees.innerHTML = "Temperature: " + degreesValue + "° F";
                humy.innerHTML = "Humidity: " + humValue + "%";
                windspeed.innerHTML = "Wind Speed: " + windValue + " kpr";

                if(historyArray.indexOf(placeValue)===-1){
                    historyArray.push(placeValue);
                    var button = $("<h5>").text(placeValue);
                    $("#searchedCity").prepend(button);
                }
                // UVp.innerHTML = "UV: " + UVValue;
            
                
            })
   }

   //5 DAY FORECAST FUNCTION

   function searchFiveDay(city) {
       fetch ("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=974d902c878dcae370e669f524ad6ba0&units=imperial")
       .then(response => response.json())
        .then(data => {
        
            for (var i=0; i<data.list.length; i++){
                if (data.list[i].dt_txt.indexOf("12:00:00")!==-1) {
                    var day = data.list[i];
                    console.log(day);
                }
            }


        });
   }

});

