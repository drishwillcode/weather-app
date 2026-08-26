const button = document.getElementById("searchbtn");
button.addEventListener("click", function() {
    let city = document.getElementById("searchcity").value;
    const url2="http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=a7c560aa1b68b9fc9316086b56c59736";    
    fetch(url2)
        .then(response=> response.json())
        .then(data=>{console.log(data);
            let lat=data[0].lat;
            let long=data[0].lon;
            const url="https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=a7c560aa1b68b9fc9316086b56c59736";
            fetch(url)
                .then(response=> response.json())
                .then(data=> {
                    console.log(data);
                    document.getElementById("city").textContent =data.name;
                    document.getElementById("temperature").textContent =data.main.temp.toFixed(1) + "°C";
                    document.getElementById("wind-speed").textContent = data.wind.speed.toFixed(1) + " km/h";
                    document.getElementById("humidity").textContent = data.main.humidity + "%";
                    document.getElementById("temp-feelslike").textContent = "feels like: " + data.main.feels_like.toFixed(1) + "°C";
                    document.getElementById("sunrisetime").textContent= new Date(data.sys.sunrise * 1000).toLocaleTimeString([],{
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    document.getElementById("sunsettime").textContent= new Date(data.sys.sunset * 1000).toLocaleTimeString([],{
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    document.getElementById("weather-condition").textContent = data.weather[0].description;
                    const iconCode = data.weather[0].icon;
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
                .catch(error=> console.error("error error!!!!", error));
});
});
        
   

