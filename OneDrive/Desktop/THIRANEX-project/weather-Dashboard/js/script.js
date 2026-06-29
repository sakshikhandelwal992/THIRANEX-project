const cityInput = document.getElementById("city-input"); // for input text..const means:->Create a variable whose reference cannot be reassigned.
const searchBtn = document.getElementById("search-btn"); // for search button it stores the search button so JavaScript can detect when the user clicks it.
//for all main elements-->storing all elements 
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherCondition = document.getElementById("weather-condition");

searchBtn.addEventListener("click", getWeather); 
async function getWeather(){  // have created a separate function which is asyncronization means "This function may take some time because it is communicating with a server."
try{

    const city = cityInput.value; //cityInput.value--> gives city name
    
    if (city === "") {  // if don't fill input and directly click on search

    alert("Please enter a city name.");

    return;  // for stoping means exit the function immediately means no API request has been sent if don't write it APIs request will send to server 

}
    const apiKey = "5c69a9699d36ca3df1e44087bcd456e9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    //console.log(url); --> can see url  on console 
    const response = await fetch(url); //fetch(url) sends a request to the server.
    //awaits is used to wait for response ..await can only be used inside an async function.

    //console.log(response);--> can see something on console 

    const data = await response.json();
// if no city with this name 
    if (data.cod === "404") {

    alert("City not found.");

    return;

}

   // console.log(data); // can see somethimh on console

cityName.textContent = data.name;
temperature.textContent = `Temperature: ${data.main.temp}°C`;
humidity.textContent = `Humidity: ${data.main.humidity}%`;
windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;
weatherCondition.textContent = `Condition: ${data.weather[0].main}`;

}
catch(error){   // to handle wrong user input or cityName like " abc527"
    alert("Something went wrong. Please try again.");
    console.log(error);

}


}

