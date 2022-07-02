var getweather = function(data) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=e1a85eb1e76f39b2b920deaf5f37b8df"
  
    // make a get request to url
    fetch(apiUrl)
    console.log(data)
}


getweather();