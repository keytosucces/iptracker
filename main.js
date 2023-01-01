const ipDisplay = document.getElementById("ip-address");
const locationDisplay = document.getElementById("location");
const timezoneDisplay = document.getElementById("timezone");
const ispDisplay = document.getElementById("isp");
const mapDisplay = document.getElementById("map");

const mymap = L.map('map').setView([34.0614, -118.08162], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2V2ZXRpaDg2MSIsImEiOiJja2h4MzFxaG8wOW5pMzBsdGZ1NXFoeHh5In0.hw5mLyF4KWalDgcxAWrmuw'
}).addTo(mymap);
const marker = L.marker([34.0614, -118.08162]).addTo(mymap);


const main = (ipAddress) => {
    const ip = ipAddress;
    const api_key = '#';
    const api_url = 'https://geo.ipify.org/api/v1?';
    const url = `${api_url}apiKey=${api_key}&ipAddress=${ip}`;
  
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        displayInfo(res);
        displayMap(res);
      });
  };
  
  const displayInfo = (res) => {
    console.log(res);
    ipDisplay.innerText = res.ip;
    locationDisplay.innerText = `${res.location.city}, ${res.location.country} ${res.location.postalCode}`;
    timezoneDisplay.innerText = `UTC ${res.location.timezone}`;
    ispDisplay.innerText = res.isp;  
  };
  
  const displayMap = (res) => {
    mymap.setView([res.location.lat, res.location.lng], 13);
    marker.setLatLng([res.location.lat, res.location.lng]);
  };
  
  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = e.target[0].value;

    // ip validation
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipv4Regex.test(userInput)) {
      alert('Please enter a valid IP address');
      return;
    }

    main(userInput);
  });

  