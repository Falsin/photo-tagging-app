import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebaseApp from "../../Firebase";
import waldo from '../../images/waldo.jpg'

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
  position: relative;

  img {
    display: block;
    /* position: relative; */
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
          createDivElem(e)
        }}/>
      </WrapperForGame>
    )
  }
}

function createDivElem(e) {
  let list = document.createElement('ul');
  let option = document.createElement('li');
  let image = document.createElement('img');
  
  option.append(image);
  list.append(option);

  setStyles(list, image, e);
  console.log(e.target.getBoundingClientRect())

  e.target.parentNode.append(list);
}

function setStyles(list, image, e) {
  /* const setVerticalCoord = window.pageYOffset + e.clientY;
  const setHorizontalCoord = window.pageXOffset + e.clientX; */

  const sizeObj = e.target.getBoundingClientRect();

  const setVerticalCoord = (e.clientY - sizeObj.top) * 100 / (sizeObj.height);
  const setHorizontalCoord = (e.clientX - sizeObj.left) * 100 / (sizeObj.width);
  console.log(e.clientX)
  console.log(sizeObj.left + sizeObj.width)
  console.log(e.clientX - sizeObj.left)

  console.log('вертикальная:' + setVerticalCoord);
  console.log('горизонтальная:' + setHorizontalCoord);
  console.log(e.clientY)

  image.style.width = '30px';
  image.style.height = '30px';
  image.src = `${waldo}`;

  list.style.listStyle = 'none';
  list.style.position = 'absolute';
  list.style.top = `${setVerticalCoord}%`;
  list.style.left = `${setHorizontalCoord}%`;
}