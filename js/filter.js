/* ==========================================
   FILTER RIWAYAT
========================================== */

export function initFilter() {

    const filterStatus =
        document.getElementById("filterStatus");

    if (!filterStatus) return;

    filterStatus.addEventListener("change", filterTable);

    const search =
    document.getElementById("searchHistory");

if (search) {

    search.addEventListener(
        "keyup",
        filterTable
    );

}

}

function filterTable() {

    const status =
        document.getElementById("filterStatus").value;

    const keyword =
        document
        .getElementById("searchHistory")
        .value
        .toLowerCase();

    const table =
        document.getElementById("historyTable");

    if (!table) return;

    Array.from(table.rows).forEach((row) => {

        const statusText =
            row.cells[4].innerText.trim();

        const rowText =
            row.innerText.toLowerCase();

        const cocokStatus =
            status === "" ||
            statusText === status;

        const cocokSearch =
            rowText.includes(keyword);

        if (cocokStatus && cocokSearch) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

}
const resetBtn =
    document.getElementById("resetFilter");

if (resetBtn) {

    resetBtn.addEventListener("click", resetFilter);

}

function resetFilter() {

    document.getElementById("filterTanggal").value = "";

    document.getElementById("filterStatus").value = "";

    document.getElementById("searchHistory").value = "";

    const table =
        document.getElementById("historyTable");

    Array.from(table.rows).forEach((row) => {

        row.style.display = "";

    });

}