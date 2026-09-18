import {

    auth,

    signInWithEmailAndPassword

} from "./firebase.js";

const btnLogin =
    document.getElementById("btnLogin");

const statusLogin =
    document.getElementById("loginStatus");

btnLogin.addEventListener("click", () => {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    signInWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then(() => {

        window.location.href =
            "index.html";

    })

    .catch((error) => {

        statusLogin.innerHTML =
            "Email atau Password salah.";

    });

});