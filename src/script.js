var button =document.querySelector(".button");
var inputValue = document.querySelector(".inputValue")
var place = document.getElementById("place");
var degrees = document.getElementById("degrees");
var humy = document.getElementById("hum");
var windspeed = document.getElementById("windy");
var UVp = document.getElementById("UV");



button.addEventListener("click", function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&appid=974d902c878dcae370e669f524ad6ba0")
.then (response => response.json())
.then (data => {
    var placeValue = data["name"];
    var degreesValue = data["main"]["temp"];
    var humValue = data["main"]["humidity"];
    var windValue = data["wind"]["speed"];
    var UVValue = data["main"]["humidity"];

    place.innerHTML = placeValue;
    degrees.innerHTML = degreesValue;
    humy.innerHTML = humValue;
    windspeed.innerHTML = windValue;
    UVp.innerHTML = UVValue;

})

});