const API_KEY = "26aa5894da92fad356e5ce7adc34ef42"

$("form").on("submit", function(event) {
  event.preventDefault();
  var input = $("#search-field").val();

  if (input) {
    $("#search-field").val("");
    $(".rubber-band").css("animation-name", "rubber-band-out");
    $.get("https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + input + "&appid=" + API_KEY, process_response).fail(response_to_failure);
  } else {
    reset_form();
  }
})

function process_response(response) {
  var place = response.name;
  var region = response.sys.country;
  var cond = response.weather[0].main;
  var degrees = Math.round(response.main.temp);
  var wind_speed = response.wind.speed;

  console.log(response);

  const STATE = {
    "AE": ", UAE",
    "AU": ", Austrailia",
    "BR": ", Brazil",
    "BD": ", Bangladesh",
    "CA": ", Canada",
    "CD": ", South Congo",
    "CN": ", China",
    "CO": ", Colombia",
    "DE": ", Germany",
    "EG": ", Egypt",
    "ES": ", Spain",
    "ET": ", Ethiopia",
    "FR": ", France",
    "IE": ", Ireland",
    "ID": ", Indonesia",
    "IL": ", Israel",
    "IN": ", India",
    "IR": ", Iran",
    "IT": ", Italy",
    "JP": ", Japan",
    "KR": ", Korea",
    "MX": ", Mexico",
    "NG": ", Nigeria",
    "NL": ", Netherlands",
    "NZ": ", New Zealand",
    "PH": ", Philippines",
    "PK": ", Pakistan",
    "RU": ", Russia",
    "TH": ", Thailand",
    "TR": ", Turkey",
    "TW": ", Taiwan",
    "UA": ", Ukraine",
    "UK": ", UK",
    "US": ", USA",
    "VN": ", Vietnam",
    "ZA": ", South Africa"
  };

  $("#results").append("<strong>" + place + (STATE[region] || "") + "<strong>");

  const ICON = {
    "Clear": "☀️",
    "Clouds": "☁️",
    "Drizzle": "🌧",
    "Rain": "🌧",
    "Snow": "❄️",
    "Thunderstorm": "⛈"
  };

  $("#results").append("<div class='icon'>" + ICON[cond] + "</div>");

  var temp;
  if (degrees < 0) {
    temp = "freezing";
    $("body").addClass("freezing");
  } else if (degrees < 10) {
    temp = "cold";
    $("body").addClass("cold");
  } else if (degrees < 20) {
    temp = "cool";
    $("body").addClass("cool");
  } else if (degrees < 30) {
    temp = "warm";
    $("body").addClass("warm");
  } else if (degrees < 40) {
    temp = "hot";
    $("body").addClass("hot");
  } else {
    temp = "too hot";
    $("body").addClass("too-hot");
  }
  
  var winds = "";
  if (wind_speed > 60) {
    winds = " with hurricane winds";
  } else if (wind_speed > 50) {
    winds = " with storm force winds";
  } else if (wind_speed > 40) {
    winds = " with gale force winds";
  } else if (wind_speed > 25) {
    winds = "with strong winds";
  } else if (wind_speed > 15) {
    winds = "and windy";
  }

  $("#results").append("<strong>" + temp + winds + "</strong>");
  $("#results").append("<div class='spacer'></div><em>Click to search again.</em>");
  $("#results").on("click", reset_form);
}

function response_to_failure() {
  $("#results").append("<div class='icon'>😞</div><strong>Could not find such a place...</strong>");
  $("#results").append("<div class='spacer'></div><em>Click to search again.</em>");
  $("#results").on("click", reset_form);
}

function reset_form() {
  $("body").removeClass();
  $("#results").html("");
  $(".rubber-band").css("animation-name", "rubber-band-in");
}