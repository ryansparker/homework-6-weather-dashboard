
// VARIABLES SEARCH
var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue")

// VARIABLES PAST SEARCH
var searched = document.getElementById("searchedCity");
var historyArray = [];

// VARIABLES DISPLAY
var place = document.getElementById("place");
var degrees = document.getElementById("degrees");
var humy = document.getElementById("hum");
var windspeed = document.getElementById("windy");
var UVIndex = document.getElementById("UV");

//VARIABLES 5 DAY DISPLAY
var dateFivep = document.getElementsByClassName("dateFive");
var weatherFivep = document.getElementsByClassName("weatherFive");
var tempFivep = document.getElementsByClassName("tempFive");
var humFivep = document.getElementsByClassName("humFive");


// button.addEventListener("click", function(){
$(document).ready(function () {
    $("#subBtn").on("click", function () {
        var city = inputValue.value;
        searchWeather(city);
        searchFiveDay(city);

    });
    $("#searchedCity").on("click", "h5", function () {
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

                var windValue = data["wind"]["speed"];

                var humValue = data["main"]["humidity"];

                place.innerHTML = placeValue + " ( " + new Date().toLocaleDateString() + " )";
                degrees.innerHTML = "Temperature: " + degreesValue + "° F";
                windspeed.innerHTML = "Wind Speed: " + windValue + " kph";
                humy.innerHTML = "Humidity: " + humValue + "%";



                //UV INDEX

                var x = data["coord"]["lat"];
                var y = data["coord"]["lon"];

                fetch("http://api.openweathermap.org/data/2.5/uvi?appid=974d902c878dcae370e669f524ad6ba0&lat=" + x + "&lon=" + y + "")
                .then(response => response.json())
                .then(data => {


                var UVValue = data["value"];

                UVIndex.innerHTML = "UV Index: " + UVValue;
                })


                //PREVIOUS SEARCH LIST
                if (historyArray.indexOf(placeValue) === -1) {
                    historyArray.push(placeValue);
                    var button = $("<h5>").text(placeValue);
                    $("#searchedCity").prepend(button);
                }



            })

    }


    //5 DAY FORECAST FUNCTION

    function searchFiveDay(city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=974d902c878dcae370e669f524ad6ba0&units=imperial")
            .then(response => response.json())
            .then(data => {
                

                for (var i = 0; i < 5; i++) {
                    // if (data.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                        var day = data.list[i];
                        
console.log(day);

                        var dateFiveValue = day["sys"]["dt_text"];
                        console.log(dateFiveValue);

                        var weatherFiveValue = day["weather"]["0"];

                        var tempFiveValue = day["main"]["temp"];

                        var humFiveValue = day["main"]["humidity"];

                        dateFivep.innerHTML = dateFiveValue;
                        weatherFivep.innerHTML = weatherFiveValue;
                        tempFivep.innerHTML = tempFiveValue;
                        humFivep.innerHTML = humFiveValue;
                    // }
                }


            });
    }




});
