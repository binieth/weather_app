window.addEventListener('load', ()=> {
    let log; 
    let lat;

    if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(position=> {
         long = position.coords.longitude; 
         lat = position.coords.latitude;
         const proxy = 'https://cors-anywhere.herokuapp.com';
         const api = `${proxy}https://api.darksky.net/forecast/c84cbbe2e875fb32c6390a72c0b7cbb6/$(lat),$(long)`
     
         fetch(api)
     .then(response => {
         return response.json();
     })
     .then(data =>{
        console.log(data); 
     });
    }); 
    }
});