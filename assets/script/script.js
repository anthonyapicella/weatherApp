// create a function that, on click, will retrieve user input, call weatherAPI and return weather details for given date

var cityList = [];
var cityName;

function renderSearchList() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    if (values.length == keys.length) {
        for (j = 0; j < values.length; j++) {
            var listBtn = $("<button>")
                .addClass("btn btn-secondary city-btn")
                .attr("id", "city" + (j + 1))
                .text(values[j]);
            var listElem = $("<li>").attr("class", "list-group-item");
            listElem.append(listBtn);
            $("#search-history").append(listElem);
        }
    }
}

renderSearchList();

$("#search-history").on("click", "button", function () {
    // alert(this.id);
    cityName = $(this).text();
    // console.log(cityName);
    searchCity();
    // location.reload();
    renderSearchList();
});

$("#gw-btn").on("click", function () {
    cityName = $("#user-input").val();
    searchCity();
    // location.reload();
    renderSearchList();
});

function searchCity() {
    // show the today card and 5day cards, also print current date
    $("#today-card").show();
    $("#current-day").text(moment().format("MMMM Do, YYYY"));
    $("#five-day-head").show();
    $("#five-day-forecast").show();

    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
            cityName +
            "&units=imperial&appid=0f7a14279d2aa10b4c3e156acc3140a9"
    )
        .then((response) => response.json())
        .then((response) => {
            // declare variables for weather values obtained from response
            var locationName = response.name;
            var temp = response.main.temp;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            var weatherImg = response.weather[0].icon;

            cityList.push(locationName);

            localStorage.setItem(locationName, locationName);

            // lat and lon will be used to pull from open weather UV API
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // declare variable for weather condition icon

            // set icon url variable and concat with above variable
            var iconurl =
                "http://openweathermap.org/img/w/" + weatherImg + ".png";

            // print values to 'todaycard'
            $("#wicon").attr("src", iconurl).width(100);
            $("#city-name").text(locationName);
            $("#temperature").text(temp);
            $("#humidity").text(humidity);
            $("#wind-speed").text(windSpeed);

            // fetch UV-index from corresponding API using latitude and longitude obtained from previous call

            fetch(
                "http://api.openweathermap.org/data/2.5/uvi?lat=" +
                    lat +
                    "&lon=" +
                    lon +
                    "&units=imperial&appid=0f7a14279d2aa10b4c3e156acc3140a9"
            )
                .then((response) => response.json())
                .then((response) => {
                    var uvIndex = response.value;

                    // print UV-index to card
                    $("#uv-index").text(uvIndex);

                    // set conditions for UV background color
                    if (uvIndex >= 11) {
                        $("#uv-index").css("background-color", "purple");
                    } else if (uvIndex >= 8 && uvIndex <= 10) {
                        $("#uv-index").css("background-color", "red");
                    } else if (uvIndex >= 6 && uvIndex <= 7) {
                        $("#uv-index").css("background-color", "orange");
                    } else if (uvIndex >= 3 && uvIndex <= 5) {
                        $("#uv-index").css("background-color", "yellow");
                    } else {
                        $("#uv-index").css("background-color", "green");
                    }
                });

            // fetch 5 day forecast => since each day includes several times, we'll use the index numbers to grab the 12noon entry for each day

            fetch(
                "https://api.openweathermap.org/data/2.5/forecast?q=" +
                    cityName +
                    "&units=imperial&appid=0f7a14279d2aa10b4c3e156acc3140a9"
            )
                .then((response) => response.json())
                .then((response) => {
                    var tempDay1 = response.list[3].main.temp;
                    var humidityDay1 = response.list[3].main.humidity;
                    var imgDay1 = response.list[3].weather[0].icon;

                    var tempDay2 = response.list[11].main.temp;
                    var humidityDay2 = response.list[11].main.humidity;
                    var imgDay2 = response.list[11].weather[0].icon;
                    var tempDay3 = response.list[19].main.temp;
                    var humidityDay3 = response.list[19].main.humidity;
                    var imgDay3 = response.list[19].weather[0].icon;

                    var tempDay4 = response.list[27].main.temp;
                    var humidityDay4 = response.list[27].main.humidity;
                    var imgDay4 = response.list[27].weather[0].icon;

                    var tempDay5 = response.list[35].main.temp;
                    var humidityDay5 = response.list[35].main.humidity;
                    var imgDay5 = response.list[35].weather[0].icon;

                    var iconurlDay1 =
                        "http://openweathermap.org/img/w/" + imgDay1 + ".png";
                    var iconurlDay2 =
                        "http://openweathermap.org/img/w/" + imgDay2 + ".png";
                    var iconurlDay3 =
                        "http://openweathermap.org/img/w/" + imgDay3 + ".png";
                    var iconurlDay4 =
                        "http://openweathermap.org/img/w/" + imgDay4 + ".png";
                    var iconurlDay5 =
                        "http://openweathermap.org/img/w/" + imgDay5 + ".png";

                    $("#wicon-1").attr("src", iconurlDay1).width(75);
                    $("#wicon-2").attr("src", iconurlDay2).width(75);
                    $("#wicon-3").attr("src", iconurlDay3).width(75);
                    $("#wicon-4").attr("src", iconurlDay4).width(75);
                    $("#wicon-5").attr("src", iconurlDay5).width(75);

                    $("#five-day-1").text(moment().add(1, "days").calendar());
                    $("#five-day-2").text(moment().add(2, "days").calendar());
                    $("#five-day-3").text(moment().add(3, "days").calendar());
                    $("#five-day-4").text(moment().add(4, "days").calendar());
                    $("#five-day-5").text(moment().add(5, "days").calendar());

                    $("#temp-day-1").text(tempDay1 + "°");
                    $("#temp-day-2").text(tempDay2 + "°");
                    $("#temp-day-3").text(tempDay3 + "°");
                    $("#temp-day-4").text(tempDay4 + "°");
                    $("#temp-day-5").text(tempDay5 + "°");

                    $("#humidity-day-1").text(humidityDay1 + "%");
                    $("#humidity-day-2").text(humidityDay2 + "%");
                    $("#humidity-day-3").text(humidityDay3 + "%");
                    $("#humidity-day-4").text(humidityDay4 + "%");
                    $("#humidity-day-5").text(humidityDay5 + "%");
                });
        });

    
}
