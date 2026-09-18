import { db, ref, set, onValue } from "./firebase.js";
import { showToast } from "./toast.js";


export function initSettings() {

    const btnSave =
        document.getElementById("saveSetting");

    if (!btnSave) return;

    // ===============================
    // SIMPAN PENGATURAN
    // ===============================

    btnSave.addEventListener("click", () => {

        const batasBahaya =
            Number(document.getElementById("batasBahaya").value);

        const intervalUpdate =
            Number(document.getElementById("intervalUpdate").value);

        const tema =
            document.querySelector(
                'input[name="tema"]:checked'
            ).value;

        set(ref(db, "Pengaturan"), {

            batasBahaya,

            intervalUpdate,

            tema

        });

        showToast(
    "⚙️ Pengaturan berhasil disimpan",
    "primary"
);
    });

    // ===============================
    // LOAD PENGATURAN
    // ===============================

    const settingRef =
        ref(db, "Pengaturan");

    onValue(settingRef, (snapshot) => {

        const data = snapshot.val();

        if (!data) return;

        document.getElementById("batasBahaya").value =
            data.batasBahaya ?? 12;

        document.getElementById("intervalUpdate").value =
            data.intervalUpdate ?? 3;

        if (data.tema === "dark") {

            document.getElementById("darkTheme").checked = true;

            document.body.classList.add("dark-mode");

        } else {

            document.getElementById("lightTheme").checked = true;

            document.body.classList.remove("dark-mode");

        }

    });

}