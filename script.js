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

    let counter = 0;

    eventJson.forEach((event) =>  {
      /** henter indhold fra wp */
        const klonEvent = eventSkabelon.cloneNode(true).content;
        klonEvent.querySelector(".img").src = event.img.guid;
        klonEvent.querySelector(".headline").textContent = event.headline;
        klonEvent.querySelector(".text").textContent = event.text;

      /** bruges som counter, til at kunne target de specifikke elementer i html'en */
        counter++;
        klonEvent.querySelector(".color-container").classList.add("color-container" + counter);
        klonEvent.querySelector(".color-container").classList.add("color-container" + counter);
        klonEvent.querySelector(".headline").classList.add("headline" + counter);
        klonEvent.querySelector(".text").classList.add("text" + counter);
        klonEvent.querySelector(".img-container").classList.add("img-container" + counter);
        
        modtagerEvent.appendChild(klonEvent);

    })

    document.querySelector(".headline2").className = "headline col-md-6 col-md-pull-5";
    document.querySelector(".text2").className = "text col-md-6 col-md-pull-5";
    document.querySelector(".img-container2").className = "img-container col-md-6 col-md-push-6";


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

