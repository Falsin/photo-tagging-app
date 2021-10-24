import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

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

const storage = getStorage(firebaseApp);

function App() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    //let link;
    getDownloadURL(ref(storage, 'images/level-1.jpg'))
      .then((url) => {
        setImage(url);
      })

      /* .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          setImage(URL.createObjectURL(xhr.response));
        };
        xhr.open('GET', url);
        xhr.send();
      }) */
  }, [])

  console.log(image);

  return (
    <div className="App">
      <h1> Hello, World! </h1>
      <ImageComp src={image} />
    </div>
  )
}

function ImageComp(props) {
  return <img src={props.src}></img>
}

/* class App extends Component {
  

  render(){
    return(
      <div className="App">
        <h1> Hello, World! </h1>
      </div>
    );
  }
} */

//export { firebaseApp };

export default App;