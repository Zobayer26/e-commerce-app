
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAp-_HhSO3juD0PDzQP8zZIOB1RjLBogus",
    authDomain: "z-shop-img.firebaseapp.com",
    projectId: "z-shop-img",
    storageBucket: "z-shop-img.appspot.com",
    messagingSenderId: "30660439081",
    appId: "1:30660439081:web:392441733df22b634dc038"
};


const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp