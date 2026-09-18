import {
    auth,
    onAuthStateChanged
} from "./firebase.js";

// Cek status login
onAuthStateChanged(auth, (user) => {

    if (!user) {

        // Jika belum login
        window.location.href = "login.html";

    }

});