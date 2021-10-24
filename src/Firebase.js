import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNKAq1f1ZR2cHFpfvK8uQYSVDme3c3AY0",
  authDomain: "photo-tagging-app-8d1c1.firebaseapp.com",
  projectId: "photo-tagging-app-8d1c1",
  storageBucket: "photo-tagging-app-8d1c1.appspot.com",
  messagingSenderId: "1058241109815",
  appId: "1:1058241109815:web:4c345126abaf01af52c4b2",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;