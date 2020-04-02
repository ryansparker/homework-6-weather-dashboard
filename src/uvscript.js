
var x = data["coord"]["lat"];
var y = data["coord"]["lon"];

fetch("http://api.openweathermap.org/data/2.5/uvi?appid=974d902c878dcae370e669f524ad6ba0&lat={lat}&lon={lon}")

var UVValue = data["value"];

UVIndex.innerHTML = "UV Index: " + UVValue;

