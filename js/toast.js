export function showToast(message, color = "success") {

    const toast = document.getElementById("liveToast");
    const body = document.getElementById("toastMessage");

    if (!toast || !body) {
        console.error("Toast tidak ditemukan");
        return;
    }

    body.innerHTML = message;

    toast.className =
        `toast text-bg-${color} border-0`;

    const bsToast = new bootstrap.Toast(toast);

    bsToast.show();

}