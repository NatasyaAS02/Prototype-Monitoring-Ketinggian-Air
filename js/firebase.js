import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getDatabase, ref, set, push, onValue} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {

    apiKey: "AIzaSyCTHAG54_rLxXGspUkzYkwzNX0yFKr0a8k",

    authDomain: "watermonitoringiot-39c35.firebaseapp.com",

    databaseURL:
        "https://watermonitoringiot-39c35-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "watermonitoringiot-39c35",

    storageBucket:
        "watermonitoringiot-39c35.firebasestorage.app",

    messagingSenderId: "393624784756",

    appId:
        "1:393624784756:web:74ea434722da2bd6c62621"

};

// ==========================================
// INISIALISASI FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);

console.log("Firebase berhasil terhubung");

// ==========================================
// EXPORT
// ==========================================

export {

    db,

    auth,

    ref,

    set,

    push,

    onValue,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

};