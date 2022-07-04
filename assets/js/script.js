var cityList =$("#city-list");
var cities = [];
var key = "e1a85eb1e76f39b2b920deaf5f37b8df";

//Formation of days
function FormatDay(date){
    var date = new Date();
    conlog.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();

    var dayOutput = date.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    return dayOutput;
}
init();
//Storage/JSON string
function init (){
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
    }
    renderCities();
    console.log(cities);
}

function storeCities(){
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
}

function renderCities(){
    cityList.empty();
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var li = $("<li>").text(city);
        li.attr("id","listC");
        li.attr("data-city",city);
        li.attr("class", "list-group-item");
        console.log(li);
        cityList.prepend(li)
    }
    if (!city){
        return
    } 
    else{
        getResponseWeather(city)
    };
}

  //When form is submitted...
  $("#add-city").on("click", function(event){
    event.preventDefault();
    // This line will grab the city from the input box
    var city = $("#city-input").val().trim();
    // Return from function early if submitted city is blank
    if (city === "") {
      return;
    }
    //Adding city-input to the city array
    cities.push(city);
    // Store updated cities in localStorage, re-render the list
    storeCities();
    renderCities();
});

function getResponseWeather(cityName){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key;
    $("#today-weather").empty();
    $.ajax({url: queryURL, method: "GET" }).then(function(response) {
        cityTitle = $("<h3>").text(response.name + " "+ FormatDay());
        $("#today-weather").append(cityTitle);
        var TemperatureToNum = parseInt((response.main.temp)*9/5 - 459);
        var cityTemperature = $("<p>").text("Temperature: "+ TemperatureToNum + " F");
        $("#today-weather").append(cityTemperature);
        var cityHumidity = $("<p>").text("Humidity: "+ response.main.humidity + " %");
        $("#today-weather").append(cityHumidity);
        var cityWindSpeed = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
        $("#today-weather").append(cityWindSpeed);

    }) 
}