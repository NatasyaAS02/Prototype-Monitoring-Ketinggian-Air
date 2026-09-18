// ==========================================
// LOGOUT.JS
// ==========================================

import { auth, signOut } from "./firebase.js";
import { showToast } from "./toast.js";

export function initLogout() {

    const btn = document.getElementById("logoutBtn");

    if (!btn) return;

    btn.addEventListener("click", () => {

        if (!confirm("Yakin ingin logout?")) return;

        signOut(auth)

            .then(() => {

                showToast(
                    "👋 Logout berhasil",
                    "secondary"
                );

                setTimeout(() => {

                    window.location.href = "login.html";

                }, 1000);

            })

            .catch((error) => {

                showToast(
                    "❌ Logout gagal",
                    "danger"
                );

                console.error(error);

            });

    });

}