// ==========================================
// EXPORT.JS
// ==========================================

export function initExport() {

    const btn =
        document.getElementById("exportData");

    if (!btn) return;


    btn.addEventListener("click", () => {

        const table =
            document.getElementById("historyTable");

        if (!table) return;


        const rows =
            Array.from(table.rows);


        if (rows.length === 0) {

            alert(
                "Tidak ada data yang dapat diekspor."
            );

            return;

        }


        let csv =
            "No,Tanggal,Jam,Ketinggian,Status,Pintu Air\n";


        let jumlahData = 0;


        rows.forEach(row => {

            // Abaikan baris yang disembunyikan
            if (
                row.style.display === "none"
            ) {

                return;

            }


            const kolom =
                Array.from(row.cells)
                    .map(cell => {

                        return `"${cell.innerText
                            .replace(/"/g, '""')}"`;

                    });


            csv +=
                kolom.join(",") +
                "\n";


            jumlahData++;

        });


        if (jumlahData === 0) {

            alert(
                "Tidak ada data yang dapat diekspor."
            );

            return;

        }


        const blob =
            new Blob(
                [csv],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "riwayat-monitoring-air.csv";


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    });

}