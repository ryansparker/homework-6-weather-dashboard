
// VARIABLES SEARCH
const button = document.querySelector(".button");
const inputValue = document.querySelector(".inputValue")

// VARIABLES PAST SEARCH
const searched = document.getElementById("searchedCity");
const historyArray = [];

// VARIABLES DISPLAY
const place = document.getElementById("place");
const weatherIcon = document.getElementById("weatherIcon");
const degrees = document.getElementById("degrees");
const humy = document.getElementById("hum");
const windspeed = document.getElementById("windy");
const UVIndex = document.getElementById("UV");

//VARIABLES 5 DAY DISPLAY
const dateFivep = document.getElementsByClassName("dateFive");
const weatherFivep = document.getElementsByClassName("weatherFive");
const tempFivep = document.getElementsByClassName("tempFive");
const humFivep = document.getElementsByClassName("humFive");

const cards = document.querySelectorAll(".fivedayCard");

const inputCity = $(".inputValue");


//--------------------------------------
// SEARCH BAR
$(document).ready(function () {
    const savedCity = localStorage.getItem("city")
    if ( savedCity ) {
        searchWeather(savedCity);
        searchFiveDay(savedCity);       
    }

    $("#subBtn").on("click", function () {
        event.preventDefault();
        const city = inputValue.value;
        searchWeather(city);
        searchFiveDay(city);
    });
    $("#searchedCity").on("click", "h5", function () {
        event.preventDefault();
        const city = inputValue.value;
        searchWeather($(this).text());
        searchFiveDay(city);
    })

    //SEARCH DAILY WEATHER FUNCTION
    function searchWeather(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=974d902c878dcae370e669f524ad6ba0&units=imperial")
            .then(response => response.json())
            .then(data => {
                if ( data.cod !== 200 ) {
                    return
                }

                window.localStorage.setItem("city", city)

                const placeValue = data.name;
                const weatherIconValue = data.weather[0].icon;
                const degreesValue = data.main.temp;
                const windValue = data.wind.speed;
                const humValue = data.main.humidity;

                place.innerHTML = placeValue + " ( " + new Date().toLocaleDateString() + " )";
                weatherIcon.src = "http://openweathermap.org/img/wn/"+ weatherIconValue +".png";
                degrees.innerHTML = "Temperature: " + degreesValue + "° F";
                windspeed.innerHTML = "Wind Speed: " + windValue + " kph";
                humy.innerHTML = "Humidity: " + humValue + "%";


                //UV INDEX
                const x = data["coord"]["lat"];
                const y = data["coord"]["lon"];

                fetch("http://api.openweathermap.org/data/2.5/uvi?appid=974d902c878dcae370e669f524ad6ba0&lat=" + x + "&lon=" + y + "")
                    .then(response => response.json())
                    .then(data => {
                        const UVValue = data.value;
                        UVIndex.innerHTML = UVValue;
                      
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

                //--------------------------------------
                //PREVIOUS SEARCH LIST
                if (historyArray.indexOf(placeValue) === -1) {
                    historyArray.push(placeValue);
                    var button = $("<h5>").text(placeValue);
                    $("#searchedCity").prepend(button);
                }



            })

    }

    //--------------------------------------
    //5 DAY FORECAST FUNCTION

    function searchFiveDay(city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=974d902c878dcae370e669f524ad6ba0&units=imperial")
            .then(response => response.json())
            .then(data => {
                if ( data.cod != 200 ) {
                    return
                }

                const days = data.list

                //LOOPING THROUGH THE DAYS. THE API HAS 40 SECTIONS—8 TIMES OF DAY FOR EACH OF 5 DAYS
                for (let i = 1; i < days.length; i += 8) {
                    const day = days[i]
                    const card = cards[(i - 1) / 8]

                    const dateFiveValue = new Date(day.dt_txt)

                    const dateString = dateFiveValue.toLocaleDateString()

                    const weatherFiveValue = day.weather[0].icon;

                    const tempFiveValue = day.main.temp;

                    const humFiveValue = day.main.humidity;

                    const dateDisplay = card.querySelector(".dateFive")
                    dateDisplay.textContent = dateString

                    const weatherDisplay = card.querySelector(".weatherFive")
                    weatherDisplay.src = "http://openweathermap.org/img/wn/"+ weatherFiveValue +".png"

                    const tempDisplay = card.querySelector(".tempFive")
                    tempDisplay.textContent = "Temp: " + tempFiveValue + "° F"

                    const humDisplay = card.querySelector(".humFive")
                    humDisplay.textContent = "Humidity: " + humFiveValue + "%";
                
                }

            });
    }




});
