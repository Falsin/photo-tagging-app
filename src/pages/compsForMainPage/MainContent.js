import React, { useEffect, useState } from "react";
import firebaseApp from "../../Firebase";
import StyledWrapperBeforeGame from "./compsForMainContent/WrapperBeforeGame";
import StyledWrapperForGame from "./compsForMainContent/wrapperForGame/WrapperForGame";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage(firebaseApp);

let img; 

export default function MainContent(props) {
  const [coords, setCoords] = useState(null);
  const [image, setImage] = useState(null);
  const [isGameOver, setGameStatus] = useState(false);
  const [timeObj, setTimer] = useState(
    {
      minut: 0,
      second: 0 
    })

  useEffect(() => {
    if (!img) {
      getDownloadURL(ref(storage, 'images/level-1.jpg'))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          img = URL.createObjectURL(xhr.response);
          setImage(URL.createObjectURL(xhr.response));
        };
        xhr.open('GET', url);
        xhr.send();
      })
    } else {
      setImage(img);
    }
  }, [])

  const propsObj = {coords, setCoords, img, isGameOver, setGameStatus, timeObj, setTimer};

  if (!props.gameState) {
    return <StyledWrapperBeforeGame image={image} />
  } else {
    return (
      <StyledWrapperForGame propsObj={propsObj} />
    )
  }
}