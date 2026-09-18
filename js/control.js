/* ==========================================
   CONTROL PINTU AIR
========================================== */

import {
    db,
    onValue,
    ref,
    set
} from "./firebase.js";

import { saveHistory } from "./history.js";
import { showToast } from "./toast.js";

export function initControl() {

    const mode =
        document.getElementById("mode");

    const btnClose =
        document.getElementById("closeGate");

    const btnHalf =
        document.getElementById("halfGate");

    const btnOpen =
        document.getElementById("openGate");

    const servoText =
        document.getElementById("servo");

    if (!mode) return;

    // ==========================
    // MODE
    // ==========================

    function updateButton() {

        const manual =
            mode.value === "Manual";

        btnClose.disabled = !manual;
        btnHalf.disabled = !manual;
        btnOpen.disabled = !manual;

    }

    updateButton();

    mode.addEventListener("change", () => {

        updateButton();

        set(
            ref(db, "Monitoring/mode"),
            mode.value
        );

    });

    // ==========================
    // TOMBOL SERVO
    // ==========================

    function kirimServo(posisi) {

        if (mode.value !== "Manual") {

            showToast(
                "Ubah mode ke Manual terlebih dahulu",
                "warning"
            );

            return;

        }

        set(
            ref(db, "Monitoring/servo"),
            posisi
        )

        .then(() => {

            if (servoText) {

                servoText.innerHTML =
                    posisi + "%";

            }

            const tinggiAir =
            parseFloat(document.getElementById("tinggiAir").textContent);

            const status =
            document.getElementById("statusAir").textContent;
            
            saveHistory(
                tinggiAir,
                status,
                posisi
            );

            if (posisi === 0) {

                showToast(
                    "Pintu air ditutup",
                    "danger"
                );

            }

            else if (posisi === 50) {

                showToast(
                    "Pintu air dibuka 50%",
                    "primary"
                );

            }
            else {

                showToast(
                    "Pintu air dibuka 100%",
                    "success"
                );

            }
        })

        .catch((error) => {

            console.error(error);

            showToast(
                "Gagal mengirim data",
                "danger"
            );

        });

    }

    btnClose.addEventListener("click", () => {

        kirimServo(0);

    });

    btnHalf.addEventListener("click", () => {

        kirimServo(50);

    });

    btnOpen.addEventListener("click", () => {

        kirimServo(100);

    });

    // ==========================
    // UPDATE DARI FIREBASE
    // ==========================

    onValue(
        ref(db, "Monitoring/servo"),
        (snapshot) => {

            const posisi = snapshot.val();

            if (servoText) {

                servoText.innerHTML =
                    posisi + "%";

            }

        }
    );

}