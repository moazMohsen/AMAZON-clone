// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvmWOhljebbCE5QhsgL9z6vPFN12apHHg",
    authDomain: "yt-3f68c.firebaseapp.com",
    projectId: "yt-3f68c",
    storageBucket: "yt-3f68c.appspot.com",
    messagingSenderId: "234283021841",
    appId: "1:234283021841:web:7cc928ed8ab465caa323b0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;