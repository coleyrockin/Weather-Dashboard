var cityList =$("#city-list");
var cities = [];
var key = "e1a85eb1e76f39b2b920deaf5f37b8df";


//Format for day
function FormatDay(date){
    var date = new Date();
    console.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dayOutput =
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day + '/'  +
     date.getFullYear()
    return dayOutput;
}

init();
function init(){
    //Parsing the JSON string to an object
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
      }
    renderCities();
}
function storeCities(){
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
}

//Function renderCities()
function renderCities() {
    cityList.empty();
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      var li = $("<li>").text(city);
      li.attr("id","listC");
      li.attr("data-city", city);
      li.attr("class", "list-group-item");
      console.log(li);
      cityList.prepend(li);
    }
    //Get Response weather for the first city only
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
        var city = $("#city-input").val().trim();
        if (city === "") {
        return;
        }
        cities.push(city);
    // Store updated cities in localStorage, re-render the list
  storeCities();
  renderCities();
  });
//Function get Response Weather 
  function getResponseWeather(cityName){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key; 
//Clear content of today-weather
    $("#today-weather").empty();
    $.ajax({url: queryURL,method: "GET"}).then(function(response) {
// Create a new table row element
      cityTitle = $("<h3>").text(response.name + " "+ FormatDay());
      $("#today-weather").append(cityTitle);
      var temperatureToNum = parseInt((response.main.temp)* 9/5 - 459);
      var cityTemperature = $("<p>").text("Tempeture: "+ temperatureToNum + " °F");
      $("#today-weather").append(cityTemperature);
      var cityHumidity = $("<p>").text("Humidity: "+ response.main.humidity + " %");
      $("#today-weather").append(cityHumidity);
      var cityWindSpeed = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
      $("#today-weather").append(cityWindSpeed);
      var CoordLat = response.coord.lat;
      var CoordLon = response.coord.lon;
    
 //Api to get UV index
    var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid="+ key+ "&lat=" + CoordLat +"&lon=" + CoordLon;
    $.ajax({url: queryURL2,method: "GET" }).then(function(responseuv) {
        var cityUV = $("<span>").text(responseuv.value);
        var cityUVp = $("<p>").text("UV Index: ");
        cityUVp.append(cityUV);
        $("#today-weather").append(cityUVp);
    });
    
//Api to get 5-day forecast  
    var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
        $.ajax({url: queryURL3,method: "GET"}).then(function(response5day) { 
        $("#boxes").empty();
        console.log(response5day);
            for(var i=0, j=0; j<=5; i=i+6){
            var read_date = response5day.list[i].dt;
            if(response5day.list[i].dt != response5day.list[i+1].dt){
                var FivedayDiv = $("<div>");
                FivedayDiv.attr("class","col-3 m-2 bg-primary")
                var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                d.setUTCSeconds(read_date);
                var date = d;
                console.log(date);
                var month = date.getMonth()+1;
                var day = date.getDate();
                var dayOutput = date.getFullYear() + '/' +
                (month<10 ? '0' : '') + month + '/' +
                (day<10 ? '0' : '') + day;
                var Fivedayh4 = $("<h6>").text(dayOutput);
                //Set src to the imags
                var imgtag = $("<img>");
                var skyconditions = response5day.list[i].weather[0].main;
                if(skyconditions==="Clouds"){
                    imgtag.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
                } else if(skyconditions==="Clear"){
                    imgtag.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
                }else if(skyconditions==="Rain"){
                    imgtag.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
                }
                var pTemperatureK = response5day.list[i].main.temp;
                console.log(skyconditions);
                var temperatureToNum = parseInt((pTemperatureK)* 9/5 - 459);
                var pTemperature = $("<p>").text("Tempeture: "+ temperatureToNum + " °F");
                var pHumidity = $("<p>").text("Humidity: "+ response5day.list[i].main.humidity + " %");
                FivedayDiv.append(Fivedayh4);
                FivedayDiv.append(imgtag);
                FivedayDiv.append(pTemperature);
                FivedayDiv.append(pHumidity);
                $("#boxes").append(FivedayDiv);
                console.log(response5day);
                j++;
                }
            }
        })
    })
  };

  //Click function to each Li 
  $(document).on("click", "#listC", function() {
    var thisCity = $(this).attr("data-city");
    getResponseWeather(thisCity);
  });
