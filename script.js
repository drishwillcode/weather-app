const button = document.getElementById("searchbtn");
button.addEventListener("click", function() {
    document.getElementById("today").style.fontSize = "90px";
});
function something() {
    document.getElementById("searchbtn").style.fontSize = "100px";
}
button.addEventListener("click", function() {
    let city = document.getElementById("searchcity").value;
    const url2="http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=a7c560aa1b68b9fc9316086b56c59736";    
    fetch(url2)
        .then(response=> response.json())
        .then(data=>{console.log(data);
            let lat=data[0].lat;
            let long=data[0].lon;
            const url="https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=a7c560aa1b68b9fc9316086b56c59736";
            fetch(url)
                .then(response=> response.json())
                .then(data=> console.log(data))
                .catch(error=> console.error("error error!!!!", error));
});
});
        
   

