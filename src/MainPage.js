import React from "react";
import Header from "./components/Header";
import firebaseApp from "./Firebase";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage(firebaseApp);

export default function MainPage() {
  return (
    <>
      <Header />
      <div>Main</div>
      <footer>footer</footer>
    </>
  )
}