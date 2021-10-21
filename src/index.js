import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

/* import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNKAq1f1ZR2cHFpfvK8uQYSVDme3c3AY0",
  authDomain: "photo-tagging-app-8d1c1.firebaseapp.com",
  projectId: "photo-tagging-app-8d1c1",
  storageBucket: "photo-tagging-app-8d1c1.appspot.com",
  messagingSenderId: "1058241109815",
  appId: "1:1058241109815:web:4c345126abaf01af52c4b2",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const pathReference = ref(storage, 'images/level-1.jpg'); */




/* const storageRef = ref(storage);
const imageRef = ref(storage, 'images/level-1.jpg');
const gsReference = ref(storage, 'gs://photo-tagging-app-8d1c1.appspot.com/images/level-1.jpg'); */


ReactDOM.render(<App />, document.getElementById("root"));