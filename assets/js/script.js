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
init()

function getResponseWeather(cityName){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key; 
}