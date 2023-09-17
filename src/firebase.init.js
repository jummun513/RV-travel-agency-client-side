// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcO8r7uSn0SZs87iAh-wQZqEoVD6LtK4E",
    authDomain: "rv-booking-project.firebaseapp.com",
    projectId: "rv-booking-project",
    storageBucket: "rv-booking-project.appspot.com",
    messagingSenderId: "250930202324",
    appId: "1:250930202324:web:c078a2bdd23eb427215d41",
    measurementId: "G-XH3K4REFJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default analytics;