// create a button lisenter and push it to city
$(".search").on("click", function () {
  var cityName = $("#input").val();
  init(cityName);
  forecastWeather(cityName);
  //   var popCity = $("<li>").text(cityName);
  //   $(popCity).appendTo(".nameList");
});

function init(cityName) {
  var city = cityName;
  const myKey = "7606e46f97d640418fe92da8694cbd65";

  // http://api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
  var queryURLweather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    myKey +
    "&units=imperial";
  $.ajax({
    url: queryURLweather,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // get the location and date to display at class='name'
    console.log(response.name);
    $(".name").text(response.name);
    // get the temperature as fer and display at class='temperature'
    console.log(response.main.temp);
    $(".temperature").text("Temperature: " + response.main.temp + " °F");
    // get the humidity and display at class='humidity'
    console.log(response.main.humidity);
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    // get the wind speed and display at class='windSpeed'
    console.log(response.wind.speed);
    $(".windSpeed").text("Wind Speed: " + response.wind.speed + " mph");
    // get the icon id
    $(".iconinfo").empty();
    console.log(response.weather[0].icon);
    var icon = response.weather[0].icon;
    var imgTag = $("<img>").attr(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    $(imgTag).appendTo(".iconinfo");
    $("<img>").attr("alt", "weather icon");
    $("<img>").attr("class", "dashIcon");
    $(".description").text("Description: " + response.weather[0].description);
    // get the UV index and display at class='uvIndex'
    console.log(response.coord.lat);
    var la = response.coord.lat;
    console.log(response.coord.lon);
    var lo = response.coord.lon;
    ultravioletIndex(la, lo);
  });
}

// UV Index function
function ultravioletIndex(a, b) {
  lat = a;
  lon = b;
  const myKey = "7606e46f97d640418fe92da8694cbd65";
  // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
  var queryURLuv =
    "http://api.openweathermap.org/data/2.5/uvi?appid=" +
    myKey +
    "&lat=" +
    lat +
    "&lon=" +
    lon;
  $.ajax({ url: queryURLuv, method: "GET" }).then(function (responseuv) {
    console.log(responseuv);
    // get the UV index and display at class='uvIndex'
    console.log(responseuv.value);
    // $(".uvIndex").text("UV Index: " + responseuv.value);
    console.log(responseuv.date_iso);
    var date = responseuv.date_iso;
    $(".date").text(date.slice(0, 10));
  });
}

function forecastWeather(cityName) {
  const myKey = "7606e46f97d640418fe92da8694cbd65";
  var city = cityName;
  //   api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}
  var queryURLforecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    myKey +
    "&units=imperial";
  $.ajax({ url: queryURLforecast, method: "GET" }).then(function (responsefor) {
    console.log(responsefor);
    for (var i = 0; i < 5; i++) {
      var start = i * 8;
      var index = i + 1;
      // get the date
      console.log(responsefor.list[start].dt_txt);
      var date = responsefor.list[start].dt_txt;
      $(`#time${index}`).text(date.slice(0, 10));
      // get the icon
      $(`#icon${index}`).empty();
      console.log(responsefor.list[start].weather[0].icon);
      var icon = responsefor.list[start].weather[0].icon;
      var imgTag = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      $(imgTag).appendTo(`#icon${index}`);
      // get the temp
      console.log(responsefor.list[start].main.temp);
      $(`#temp${index}`).text(
        "Temp: " + responsefor.list[start].main.temp + " °F"
      );
      // get the hum
      console.log(responsefor.list[start].main.humidity);
      $(`#hum${index}`).text(
        "Humidity: " + responsefor.list[start].main.humidity + "%"
      );
    }
  });
}
