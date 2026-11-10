// Udgivelsen: 19. november 2026 kl. 00.00 dansk tid (+01:00 om vinteren)
var maal = new Date("2026-11-19T00:00:00+01:00").getTime();
// Første trailer: 5. december 2023
var start = new Date("2023-12-05T00:00:00+01:00").getTime();

var elD = document.getElementById("c-d");
var elT = document.getElementById("c-t");
var elM = document.getElementById("c-m");
var elS = document.getElementById("c-s");
var elP = document.getElementById("c-p");
var elBar = document.getElementById("c-bar");
var secBox = elS.parentElement;

// Skriver et tal ind og lader det hoppe, hvis det er ændret
function saet(el, tekst) {
    if (el.textContent !== tekst) {
        el.textContent = tekst;
        el.classList.remove("tick");
        void el.offsetWidth;
        el.classList.add("tick");
    }
}

function nul(n) { return n < 10 ? "0" + n : "" + n; }

function opdater() {
    var nu = Date.now();
    var rest = maal - nu;
    if (rest <= 0) {
        saet(elD, "0"); saet(elT, "00"); saet(elM, "00"); saet(elS, "00");
        document.querySelector(".count-date").textContent = "GTA VI er udkommet.";
        elP.textContent = "100 %";
        elBar.style.width = "100%";
        return;
    }
    var sek = Math.floor(rest / 1000);
    var dage = Math.floor(sek / 86400);
    var timer = Math.floor((sek % 86400) / 3600);
    var min = Math.floor((sek % 3600) / 60);
    var s = sek % 60;
    saet(elD, "" + dage);
    saet(elT, nul(timer));
    saet(elM, nul(min));
    saet(elS, nul(s));
    // Ringen om sekunderne fyldes op i løbet af ét minut
    secBox.style.setProperty("--sec", (60 - s) / 60);
    var procent = (nu - start) / (maal - start) * 100;
    elP.textContent = procent.toFixed(1).replace(".", ",") + " %";
    elBar.style.width = procent + "%";
}

opdater();
setInterval(opdater, 250);