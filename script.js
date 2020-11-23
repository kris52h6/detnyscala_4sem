"use strict";

let side;
const url = "http://kristianhadberg.dk/kea/4sem/detnyscala/wordpress/wp-json/wp/v2/image";

window.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("h1").style.color = "blue";
    hentJson();
}

async function hentJson() {
    const response = await fetch(url);
    side = await response.json();
    vis();
}

function vis() {
    document.querySelector("p").textContent = side[0].title.rendered;
    document.querySelector("img").src = side[0].image.guid;
}

