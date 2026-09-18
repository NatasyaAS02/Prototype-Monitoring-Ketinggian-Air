// ==========================================
// HISTORY.JS
// RIWAYAT MONITORING AIR
// ==========================================

let historyData = [];


// ==========================================
// SIMPAN RIWAYAT
// ==========================================

export function saveHistory(
    tinggiAir,
    status,
    servo 
) {

    const data = {

        no: historyData.length + 1,

        tanggal: new Date().toLocaleDateString("id-ID"),

        jam: new Date().toLocaleTimeString("id-ID"),

        ketinggian: Number(tinggiAir).toFixed(1),

        status: status,

        servo: servo

    };

    historyData.unshift(data);

    // Maksimal 100 data
    if (historyData.length > 100) {

        historyData.pop();

    }

    tampilkanHistory();
}


// ==========================================
// TAMPILKAN RIWAYAT
// ==========================================

export function tampilkanHistory(data = historyData) {

    const table =
        document.getElementById("historyTable");

    if (!table) return;

    table.innerHTML = "";

    data.forEach((item, index) => {

        const row =
            table.insertRow();

        row.insertCell(0).innerText =
            index + 1;

        row.insertCell(1).innerText =
            item.tanggal;

        row.insertCell(2).innerText =
            item.jam;

        row.insertCell(3).innerText =
            item.ketinggian + " cm";

        const statusCell =
            row.insertCell(4);

        let badgeClass =
            "bg-success";

        if (item.status === "SIAGA") {

            badgeClass =
                "bg-warning text-dark";

        }

        else if (item.status === "BAHAYA") {

            badgeClass =
                "bg-danger";

        }

        statusCell.innerHTML =
            `<span class="badge ${badgeClass}">
                ${item.status}
            </span>`;

        row.insertCell(5).innerText =
            item.servo + "%";

    });

}


// ==========================================
// LOAD HISTORY
// ==========================================

export function loadHistory() {

    tampilkanHistory();

}


// ==========================================
// FILTER RIWAYAT
// ==========================================

export function initHistoryFilter() {

    const dateFilter =
        document.getElementById("filterDate");

    const statusFilter =
        document.getElementById("filterStatus");

    const searchInput =
        document.getElementById("searchHistory");

    const resetButton =
        document.getElementById("resetFilter");


    function filterHistory() {

        const tanggal =
            dateFilter
                ? dateFilter.value
                : "";

        const status =
            statusFilter
                ? statusFilter.value
                : "";

        const pencarian =
            searchInput
                ? searchInput.value.toLowerCase()
                : "";


        const hasil =
            historyData.filter(item => {

                // ==========================
                // FILTER STATUS
                // ==========================

                if (
                    status &&
                    item.status !== status
                ) {

                    return false;

                }


                // ==========================
                // FILTER PENCARIAN
                // ==========================

                if (pencarian) {

                    const teks =
                        (
                            item.tanggal +
                            " " +
                            item.jam +
                            " " +
                            item.ketinggian +
                            " " +
                            item.status +
                            " " +
                            item.servo
                        ).toLowerCase();

                    if (!teks.includes(pencarian)) {

                        return false;

                    }

                }


                // ==========================
                // FILTER TANGGAL
                // ==========================

                if (tanggal) {

                    const tanggalIndonesia =
                        item.tanggal.split("/");

                    if (
                        tanggalIndonesia.length === 3
                    ) {

                        const cocok =
                            tanggalIndonesia[2] +
                            "-" +
                            tanggalIndonesia[1].padStart(2, "0") +
                            "-" +
                            tanggalIndonesia[0].padStart(2, "0");

                        if (cocok !== tanggal) {

                            return false;

                        }

                    }

                }

                return true;

            });


        tampilkanHistory(hasil);

    }


    // ==========================
    // EVENT FILTER
    // ==========================

    if (dateFilter) {

        dateFilter.addEventListener(
            "change",
            filterHistory
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterHistory
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterHistory
        );

    }


    // ==========================
    // RESET
    // ==========================

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                if (dateFilter) {

                    dateFilter.value = "";

                }

                if (statusFilter) {

                    statusFilter.value = "";

                }

                if (searchInput) {

                    searchInput.value = "";

                }

                tampilkanHistory();

            }
        );

    }

}