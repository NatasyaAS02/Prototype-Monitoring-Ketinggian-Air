// ==========================================
// CHART.JS
// ==========================================

let chart = null;


// ==========================================
// CEK TEMA
// ==========================================

function isDarkMode() {

    return document.body.classList.contains("dark-mode");

}


// ==========================================
// WARNA CHART
// ==========================================

function getChartColors() {

    if (isDarkMode()) {

        return {

            text: "#e2e8f0",

            grid: "#334155",

            border: "#60a5fa",

            background: "rgba(96,165,250,.15)"

        };

    }

    return {

        text: "#334155",

        grid: "#e5e7eb",

        border: "#2563eb",

        background: "rgba(37,99,235,.15)"

    };

}


// ==========================================
// BUAT CHART
// ==========================================

export function createChart() {

    if (chart) {

        chart.destroy();

    }


    const canvas =
        document.getElementById("chartAir");

    if (!canvas) return;


    const colors =
        getChartColors();


    chart = new Chart(canvas, {

        type: "line",


        data: {

            labels: [],


            datasets: [{

                label: "Ketinggian Air (cm)",

                data: [],

                borderColor:
                    colors.border,

                backgroundColor:
                    colors.background,

                fill: true,

                tension: 0.4,

                borderWidth: 2,

                pointRadius: 3,

                pointHoverRadius: 5

            }]

        },


        options: {

            responsive: true,

            maintainAspectRatio: false,


            plugins: {

                legend: {

                    display: true,

                    labels: {

                        color:
                            colors.text,

                        font: {

                            size: 13

                        }

                    }

                }

            },


            scales: {

                x: {

                    ticks: {

                        color:
                            colors.text,

                        font: {

                            size: 11

                        }

                    },

                    grid: {

                        color:
                            colors.grid

                    }

                },


                y: {

                    beginAtZero: false,

                    ticks: {

                        color:
                            colors.text,

                        font: {

                            size: 11

                        }

                    },

                    grid: {

                        color:
                            colors.grid

                    }

                }

            }

        }

    });

}


// ==========================================
// UPDATE CHART
// ==========================================

export function updateChart(tinggiAir) {

    if (!chart) return;


    const waktu =
        new Date().toLocaleTimeString(
            "id-ID",
            {

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit"

            }
        );


    chart.data.labels.push(waktu);


    chart.data.datasets[0].data.push(
        Number(tinggiAir)
    );


    if (
        chart.data.labels.length > 15
    ) {

        chart.data.labels.shift();

        chart.data.datasets[0].data.shift();

    }


    chart.update("none");

}


// ==========================================
// UPDATE TEMA CHART
// ==========================================

export function updateChartTheme() {

    if (!chart) return;


    const colors =
        getChartColors();


    chart.options.plugins.legend.labels.color =
        colors.text;


    chart.options.scales.x.ticks.color =
        colors.text;

    chart.options.scales.y.ticks.color =
        colors.text;


    chart.options.scales.x.grid.color =
        colors.grid;

    chart.options.scales.y.grid.color =
        colors.grid;


    chart.data.datasets[0].borderColor =
        colors.border;


    chart.data.datasets[0].backgroundColor =
        colors.background;


    chart.update();

}