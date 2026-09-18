/* ==========================================
   MONITORING.JS
========================================== */

import {
    db,
    ref,
    onValue
} from "./firebase.js";

let callback = null;

export function setMonitoringCallback(fn) {

    callback = fn;

}

onValue(ref(db, "Monitoring"), (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    if (callback) {

        callback(data);

    }

});