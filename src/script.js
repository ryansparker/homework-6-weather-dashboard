
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

const cards = document.querySelectorAll(".fivedayCard");

// button.addEventListener("click", function(){
$(document).ready(function () {
    $("#subBtn").on("click", function () {
        const city = inputValue.value;
        searchWeather(city);
        searchFiveDay(city);

    });
    $("#searchedCity").on("click", "h5", function () {
        const city = inputValue.value;
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

                        UVIndex.innerHTML = UVValue;

                        //--------------------------------------
                        //COLOR CHANGE

                        function updateBg() {

                            $("#UV").each(function () {
                                if (UVValue < 2) {
                                    $(this).addClass("low");
                                    $(this).removeClass("moderate");
                                    $(this).removeClass("high");
                                    $(this).removeClass("veryHigh");
                                    $(this).removeClass("extreme");
                                }
                                else if (UVValue < 6 && UVValue > 3) {
                                    $(this).removeClass("low");
                                    $(this).addClass("moderate");
                                    $(this).removeClass("high");
                                    $(this).removeClass("veryHigh");
                                    $(this).removeClass("extreme");

                                } else if (UVValue < 8 && UVValue > 6) {
                                    $(this).removeClass("low");
                                    $(this).removeClass("moderate");
                                    $(this).addClass("high");
                                    $(this).removeClass("veryHigh");
                                    $(this).removeClass("extreme");
                                }
                                else if (UVValue < 11 && UVValue > 8) {
                                    $(this).removeClass("low");
                                    $(this).removeClass("moderate");
                                    $(this).removeClass("high");
                                    $(this).addClass("veryHigh");
                                    $(this).removeClass("extreme");
                                }
                                else if (UVValue >= 11) {
                                    $(this).removeClass("low");
                                    $(this).removeClass("moderate");
                                    $(this).removeClass("high");
                                    $(this).removeClass("veryHigh");
                                    $(this).addClass("extreme");
                                }
                            });
                        }
                        updateBg();
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
            .then( data => {
                console.log("OBJECT:", data)
                const days = data.list

                for (let i = 1; i < days.length; i += 8 ) {
                    const day = days[i]
                    const card = cards[(i - 1) / 8]

                    console.log("DAY", day)

                    const dateFiveValue = new Date(day.dt_txt)
                    console.log("DATE", dateFiveValue)

                    const dateString = dateFiveValue.toLocaleDateString()

                    console.log(dateFiveValue);

                    var weatherFiveValue = day["weather"]["0"]["main"];
                    console.log(weatherFiveValue);

                    var tempFiveValue = day["main"]["temp"];
                    console.log(tempFiveValue);

                    var humFiveValue = day["main"]["humidity"];
                    console.log(humFiveValue);

                    const dateDisplay = card.querySelector(".dateFive")
                    dateDisplay.textContent = dateString;

                    const weatherDisplay = card.querySelector(".weatherFive")
                    weatherDisplay.textContent = "Weather: " + weatherFiveValue;

                    const tempDisplay = card.querySelector(".tempFive")
                    tempDisplay.textContent = "Temp: " + tempFiveValue + "° F";

                    const humDisplay = card.querySelector(".humFive")
                    humDisplay.textContent = "Humidity: " + humFiveValue + "%";
                
                    // humy.innerHTML = "Humidity: " + humValue + "%";
                }
            });
    }




});
