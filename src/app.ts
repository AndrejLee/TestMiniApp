// Import React and ReactDOM
import React from "react";
import { createRoot } from "react-dom/client";

import "swiper/css";
import "swiper/css/pagination";
import "zmp-ui/zaui.css";
import "./css/tailwind.css";
import "./css/app.scss";

// Import App Component
import App from "./components/app";
import appConfig from "../app-config.json";

import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyB76O21_Wk6AdQDjMaLKb6adcu1vC2BaOY",
  authDomain: "testminiappdb.firebaseapp.com",
  projectId: "testminiappdb",
  storageBucket: "testminiappdb.appspot.com",
  messagingSenderId: "826885555041",
  appId: "1:826885555041:web:c9f80dbddff96fd262bb20",
  measurementId: "G-DVXJ4R5T26"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const firebaseDB = firebase.firestore();

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}
// Mount React App
const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(App));
