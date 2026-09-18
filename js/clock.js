export function initClock() {

    function updateClock() {

        const now = new Date();

        document.getElementById("clock").innerHTML =
            now.toLocaleTimeString("id-ID");

        document.getElementById("date").innerHTML =
            now.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });

    }

    updateClock();

    setInterval(updateClock, 1000);

}