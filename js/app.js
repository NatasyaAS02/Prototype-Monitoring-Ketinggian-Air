/* ==========================================
   WATER MONITORING DASHBOARD
   app.js - MODE SIMULASI WEB
========================================== */
import "./sidebar.js";

import { createChart, updateChart } from "./chart.js";
import { initClock } from "./clock.js";
import { initControl } from "./control.js";
import { initExport } from "./export.js";
import { initFilter } from "./filter.js";
import { db, onValue, ref } from "./firebase.js";
import { initHistoryFilter, loadHistory, saveHistory } from "./history.js";
import { initLogout } from "./logout.js";
import { initSettings } from "./settings.js";

let tinggiAir = 5;
let arahAir = 1;
let servo = 0;

createChart();

loadHistory();
initHistoryFilter

initControl();

initSettings();

initClock();

initExport();

initLogout();

initFilter();

onValue(ref(db, "Monitoring/servo"), (snapshot) => {

    servo = Number(snapshot.val() ?? 0);

    const servoElement =
        document.getElementById("servo");

    if (servoElement) {

        servoElement.innerHTML = servo + "%";

    }

});

// ==========================================
// STATUS AIR BATAS BAHAYA = 12 CM
// ==========================================

function tentukanStatus(nilai) {

    if (nilai < 6) {
        return "AMAN";
    }

    if (nilai < 12) {
        return "SIAGA";
    }

    return "BAHAYA";
}


// ==========================================
// WARNA STATUS
// ==========================================

function updateStatusColor(status) {

    const element =
        document.getElementById("statusAir");

    if (!element) return;


    if (status === "AMAN") {

        element.style.color = "#22c55e";

    }

    else if (status === "SIAGA") {

        element.style.color = "#f59e0b";

    }

    else {

        element.style.color = "#ef4444";

    }

}

// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    const status =
        tentukanStatus(tinggiAir);


    // ======================================
    // KETINGGIAN AIR
    // ======================================

    const tinggiElement =
        document.getElementById("tinggiAir");


    if (tinggiElement) {

        tinggiElement.innerHTML =
            tinggiAir.toFixed(1) + " cm";

    }


    // ======================================
    // STATUS
    // ======================================

    const statusElement =
        document.getElementById("statusAir");


    if (statusElement) {

        statusElement.innerHTML =
            status;

    }


    updateStatusColor(status);


    // ======================================
    // PERSENTASE AIR
    // ======================================

    const persen =
        Math.round(
            (tinggiAir / 12) * 100
        );


    const persenElement =
        document.getElementById("persenAir");


    if (persenElement) {

        persenElement.innerHTML =
            persen + " %";

    }


    // ======================================
    // TANGKI AIR
    // ======================================

    const waterLevel =
        document.getElementById("waterLevel");


    if (waterLevel) {

        waterLevel.style.height =
            persen + "%";

    }


    // ======================================
    // GRAFIK
    // ======================================

   updateChart(tinggiAir);

    // ======================================
    // RIWAYAT
    // ======================================

    saveHistory( tinggiAir, status, servo);
}


// Jalankan pertama kali
updateDashboard();

const menuItems = document.querySelectorAll(".menu li");
const sections = document.querySelectorAll("section");