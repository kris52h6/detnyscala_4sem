"use strict";

const url = "http://kristianhadberg.dk/kea/4sem/detnyscala/wordpress/wp-json/wp/v2/event";
const footerUrl = "http://kristianhadberg.dk/kea/4sem/detnyscala/wordpress/wp-json/wp/v2/openinghour";
const covidUrl = "http://kristianhadberg.dk/kea/4sem/detnyscala/wordpress/wp-json/wp/v2/covid";

window.addEventListener("DOMContentLoaded", init);

function init() {
    hentJson();
}

async function hentJson(eventJson, footerJson, covidJson) {
    const response = await fetch(url);
    eventJson = await response.json();
    const responseFooter = await fetch(footerUrl);
    footerJson = await responseFooter.json();
    const responseCovid = await fetch(covidUrl);
    covidJson = await responseCovid.json();
    vis(eventJson, footerJson, covidJson);
}

function vis(eventJson, footerJson, covidJson) {
  const modtagerEvent = document.querySelector(".eventlist");
  const eventSkabelon = document.querySelector("#event-template");
  const modtagerFooter = document.querySelector(".footerlist");
  const footerSkabelon = document.querySelector("#footer-template");
  const modtagerCovid = document.querySelector(".covidlist");
  const covidSkabelon = document.querySelector("#covid-template");


    modtagerEvent.innerHTML = "";
    modtagerFooter.innerHTML = "";
    modtagerCovid.innerHTML = "";

    eventJson.forEach((event) =>  {
        const klonEvent = eventSkabelon.cloneNode(true).content;
        console.log(event)
        klonEvent.querySelector(".img").src = event.img.guid;

        klonEvent.querySelector(".headline").textContent = event.headline;
        klonEvent.querySelector(".text").textContent = event.text;
        klonEvent.querySelector(".text2").textContent = event.text2;
        modtagerEvent.appendChild(klonEvent);

    })


    footerJson.forEach((openinghour) => {
        const klonFooter = footerSkabelon.cloneNode(true).content;
        klonFooter.querySelector("p").textContent = openinghour.text;
        
        modtagerFooter.appendChild(klonFooter);
    })

    document.querySelector(".covid").textContent = covidJson[0].text;







}


function initMap() {
  const myLatLng = {
    lat: 55.6883,
    lng: 12.5618

  };
  const map = new google.maps.Map(document.getElementById("map1"), {
    mapId: "4d4d4a87dc380f52",
    zoom: 15,
    center: myLatLng,
    fullscreenControl: true,
    zoomControl: true,
    streetViewControl: false
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!"
  });
}

