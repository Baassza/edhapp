import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBUg9C1agGzSWN9aU6e522q3OLrCbQQ4L8",
  authDomain: "edhapp-3a149.firebaseapp.com",
  projectId: "edhapp-3a149",
  storageBucket: "edhapp-3a149.appspot.com",
  messagingSenderId: "901959233991",
  appId: "1:901959233991:web:d77b13a4ce3cb99889e9e2"
};

if (getApps().length < 1) {
  const app = initializeApp(firebaseConfig);
}