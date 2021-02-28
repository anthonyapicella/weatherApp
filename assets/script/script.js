$("#today-card").hide();

var city = document.querySelector('#city-name');
var temperature = document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');
var button = document.querySelector('#gW-btn');



$("#gw-btn").on('click',(function(){
    $("#today-card").show();
    $("#current-day").text(moment().format('MMMM Do, YYYY'));
}));