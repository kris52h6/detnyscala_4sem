"use strict";



const url = "http://kristianhadberg.dk/kea/4sem/detnyscala/wordpress/wp-json/wp/v2/event";
const instaUrl = "http://kristianhadberg.dk/kea/4sem/detnyscala/wordpress/wp-json/wp/v2/instagramimage"
const footerUrl = "http://kristianhadberg.dk/kea/4sem/detnyscala/wordpress/wp-json/wp/v2/openinghour";
const covidUrl = "http://kristianhadberg.dk/kea/4sem/detnyscala/wordpress/wp-json/wp/v2/covid";

let carrouselNum = 0;


window.addEventListener("DOMContentLoaded", init);
window.onscroll = function() {stickyMenu()};

const header = document.querySelector("#info");
const sticky = header.offsetTop;
const body = document.body;

function stickyMenu() {
  if(window.pageYOffset > sticky) {
    document.querySelector(".menuknap").classList.add("sticky");
  } else {
    document.querySelector(".menuknap").classList.remove("sticky");
  }

}

function init() {
    document.querySelector(".splash-container a").classList.add("bounce");
    hentJson();
    initMap();
    carrousel();
    document.querySelector(".menuknap").addEventListener("click", toggleMenu);


}


function toggleMenu() {
  console.log("toggleMenu");
  document.querySelector(".menuknap").addEventListener("click", toggleMenu);
  document.querySelector(".menu").classList.toggle("showmenu");
  document.querySelector("ul").addEventListener("click", toggleMenu);
  document.querySelector("body").classList.toggle("bodyHidden");


  let erSkjult = document.querySelector(".menu").classList.contains("showmenu");
  if (erSkjult == true) {
      document.querySelector(".menuknap").textContent = "✕";

      document.querySelector(".menuknap").classList.add("whiten");

  } else {
      document.querySelector(".menuknap").textContent = "☰";
      document.querySelector(".menuknap").classList.remove("whiten");
  }
}

async function hentJson(eventJson, instaJson, footerJson, covidJson) {
    const response = await fetch(url);
    eventJson = await response.json();

    const responseInsta = await fetch(instaUrl);
    instaJson = await responseInsta.json();

    const responseFooter = await fetch(footerUrl);
    footerJson = await responseFooter.json();

    const responseCovid = await fetch(covidUrl);
    covidJson = await responseCovid.json();
    vis(eventJson, instaJson, footerJson, covidJson);
}

function vis(eventJson, instaJson, footerJson, covidJson) {
  const modtagerEvent = document.querySelector(".eventlist");
  const eventSkabelon = document.querySelector("#event-template");

  const modtagerInsta = document.querySelector(".grid");
  const instaSkabelon = document.querySelector("#insta-template");

  const modtagerFooter = document.querySelector(".footerlist");
  const footerSkabelon = document.querySelector("#footer-template");

  const modtagerCovid = document.querySelector(".covidlist");
  const covidSkabelon = document.querySelector("#covid-template");



    modtagerEvent.innerHTML = "";
    modtagerInsta.innerHTML = "";

    modtagerFooter.innerHTML = "";
    modtagerCovid.innerHTML = "";

    let counter = 0;
    let instaCounter = 0;

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

    instaJson.forEach((instaimage) => {
      const klonInsta = instaSkabelon.cloneNode(true).content;
      instaCounter++;

      klonInsta.querySelector("img").src = instaimage.igimage.guid;
      klonInsta.querySelector(".insta").classList.add("insta" + instaCounter);

      modtagerInsta.appendChild(klonInsta);

    }) 

    document.querySelector(".headline2").className = "headline col-md-6 col-md-pull-4";
    document.querySelector(".text2").className = "text col-md-6 col-md-pull-4";
    document.querySelector(".img-container2").className = "img-container col-md-6 col-md-push-6";


    footerJson.forEach((openinghour) => {
        const klonFooter = footerSkabelon.cloneNode(true).content;
        klonFooter.querySelector("p").textContent = openinghour.text;
        
        modtagerFooter.appendChild(klonFooter);
    })

    document.querySelector(".covid").textContent = covidJson[0].text;


}


function carrousel() {
  document.querySelector(".p1").style.display = "none";
  document.querySelector(".p2").style.display = "none";
  document.querySelector(".p3").style.display = "none";


  setInterval(() => {
    carrouselNum++;
    carrouselCount();
  }, 6000);
  
}


function carrouselCount() {
  document.querySelector(".p1").style.display = "none";
  document.querySelector(".p2").style.display = "none";
  document.querySelector(".p3").style.display = "none";


  if(carrouselNum > 3) {
    carrouselNum = 1;
  }
    document.querySelector(".p" + carrouselNum).style.display = "block";
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

