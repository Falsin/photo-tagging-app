import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebaseApp from "../../Firebase";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

const storage = getStorage(firebaseApp);

const WrapperBeforeGame = styled.div`
  a {
    display: block;
    width: 200px;
    height: 150px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`

const WrapperForGame = styled.div`
  display: flex;
  justify-content: center;

  img {
    display: block;
    position: relative;
  }
`

// сохранить сюда

let img; 

export default function MainContent(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    getDownloadURL(ref(storage, 'images/level-1.jpg'))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          img = URL.createObjectURL(xhr.response);
          setImage(URL.createObjectURL(xhr.response));
        };
        xhr.open('GET', url);
        xhr.send();
      })
  }, [])

  if (!props.gameState) {
    return (
      <WrapperBeforeGame>
        <h2>Level 1</h2>

        <Link to="/gamePage">
          <img src={image}></img>
        </Link>
      </WrapperBeforeGame>
    )
  } else {
    return (
      <WrapperForGame >
        <img src={img} onClick={(e) => {
          console.log(e)
          let div = document.createElement('div');
          div.style.width = '10px'
          div.style.height = '10px';
          div.style.background = 'red';
          div.style.position = 'absolute';
          div.style.top = `${e.clientY}px`;
          div.style.left = `${e.clientX}px`;
          div.style.zIndex = '3';
          e.target.parentNode.append(div);
          console.log(e.target.getBoundingClientRect())
          //e.target.append(div);
        }}/>
      </WrapperForGame>
    )
  }
}