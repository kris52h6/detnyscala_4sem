"use strict";

// let side;
// const url = "http://kristianhadberg.dk/kea/4sem/detnyscala/wordpress/wp-json/wp/v2/image";

// window.addEventListener("DOMContentLoaded", init);

// function init() {
//     document.querySelector("h1").style.color = "blue";
//     hentJson();
// }

// async function hentJson() {
//     const response = await fetch(url);
//     side = await response.json();
//     vis();
// }

// function vis() {
//     document.querySelector("p").textContent = side[0].title.rendered;
//     document.querySelector("img").src = side[0].image.guid;
// }


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

