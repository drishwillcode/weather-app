const button = document.getElementById("searchbtn");
const to_search = document.getElementById("searchcity");

function searchweather(){
    const city = to_search.value;

    fetch(`/weather?city=${city}`)
        .then(response=> {
            if (!response.ok){
                return response.json().then(data=>{
                    throw new Error(data.error)
                });
            }
            return response.json();
             })
        .then(data=> {
                    console.log(data);
                    document.getElementById("city").textContent =data.name;
                    document.getElementById("temperature").textContent =data.temp.toFixed(1) + "°C";
                    document.getElementById("wind-speed").textContent = data.wind_speed.toFixed(1) + " km/h";
                    document.getElementById("humidity").textContent = data.humidity + "%";
                    document.getElementById("temp-feelslike").textContent = "feels like: " + data.feels_like.toFixed(1) + "°C";
                    document.getElementById("sunrisetime").textContent= new Date(data.sunrise * 1000).toLocaleTimeString([],{
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    document.getElementById("sunsettime").textContent= new Date(data.sunset * 1000).toLocaleTimeString([],{
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    document.getElementById("weather-condition").textContent = data.description;
                    const iconCode = data.icon;
                    const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                    document.getElementById("weathericon").src = iconUrl;
                    
                    const timezone=data.timezone;
                    const now=new Date();
                    const citytime=new Date(now.getTime() + timezone*1000);
                    const styling={
                        month:'long',
                        day:'numeric',
                    };
                    const date=citytime.toLocaleDateString(undefined,styling);
                    const hours = String(citytime.getUTCHours()).padStart(2, "0");
                    const minutes = String(citytime.getUTCMinutes()).padStart(2, "0");

                    const dateTime = `${date}, ${hours}${minutes}hrs`;
                    document.getElementById("datetime").textContent=dateTime;

                    
                })
                .catch(error=>{
                        document.getElementById("city").textContent=error.message;
                        document.getElementById("weathericon").src="";
                        document.querySelectorAll(".weather-data").forEach(element=>{
                            element.textContent="--";
                    });
                });
            }
button.addEventListener("click", searchweather);
to_search.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        searchweather();
    }
});



        
   

