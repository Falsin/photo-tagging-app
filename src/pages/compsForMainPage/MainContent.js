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
/*           console.log(e);
          console.log(e.target.getBoundingClientRect()) */
          deleteDivElem(e);
          createDivElem(e);
          //checkCoord(e);
        }}/>
      </WrapperForGame>
    )
  }
}

function deleteDivElem(e) {
  const list = e.target.parentNode.querySelector('ul');
  if (list) {
    list.remove();
  }
}

function createDivElem(e) {
  let list = document.createElement('ul');
  let option = document.createElement('li');
  let image = document.createElement('img');

  option.addEventListener('mousedown', (e) => checkCoord(e));
  
  option.append(image);
  list.append(option);

  setStyles(list, image, e);
  e.target.parentNode.append(list);
}

function setStyles(list, image, e) {
  const sizeObj = e.target.getBoundingClientRect();
  const setVerticalCoord = (e.clientY - sizeObj.top) * 100 / sizeObj.height;
  const setHorizontalCoord = (e.clientX - sizeObj.left) * 100 / sizeObj.width;

  image.style.width = '30px';
  image.style.height = '30px';
  image.src = `${waldo}`;

  list.style.listStyle = 'none';
  list.style.position = 'absolute';
  list.style.top = `${setVerticalCoord}%`;
  list.style.left = `${setHorizontalCoord}%`;
}

function checkCoord(e) {
  console.log(e)
  const WaldoCoord = {
    x1: 51.71,
    y1: 46.38,
    x2: 53.86,
    y2: 51.46,
  }
}