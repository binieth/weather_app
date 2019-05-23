window.addEventListener('load', ()=> {
    let long; 
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(position => {
         long = position.coords.longitude; 
         lat = position.coords.latitude;
         const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c84cbbe2e875fb32c6390a72c0b7cbb6/${lat},${long}`;
     
         fetch(api)
            .then(response => {
               return response.json();
     })
        .then(data => {
            const{temperature, summary, icon} = data.currently;
            //set DOM elements from the API
            temperatureDegree.textContent = Math.round(temperature);
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            //conversion formula

            let celsius = Math.round((temperature - 32)*(5/9));
            let Farhanite = Math.round((9/5)*(celsius + 32));
            //Set Icon
            setIcons(icon, document.querySelector(".icon"));
            
            //chnage to Farhanite/degree_celcious
            temperatureSection.addEventListener('click', () => {
                if(temperatureSpan.textContent === '\xB0' + "F"){
                   temperatureSpan.textContent = '\xB0' + "C";
                   temperatureDegree.textContent = Math.round(celsius);
                } else{
                    temperatureSpan.textContent = '\xB0' + "F"; 
                    temperatureDegree.textContent = Math.round(temperature);
                }
            })

        });
     }); 
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});