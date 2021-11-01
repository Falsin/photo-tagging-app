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
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;

  img {
    display: block;
    max-width: 100vmax;
  }
`

let img; 

export default function MainContent(props) {
  const [image, setImage] = useState(null);
  const [isGameOver, setGameStatus] = useState(false);
  const [timeObj, setTimer] = useState(
    {
      minut: 0,
      second: 0 
    })

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
        <TimerComp gameStatus={{isGameOver, setGameStatus, timeObj, setTimer}} />
        <img src={img} onClick={(e) => {
          deleteDivElem(e);
          createDivElem(e, {isGameOver, setGameStatus});
        }}/>

        {/* <PopUp>
          Pop up!
        </PopUp> */}
        {(!isGameOver ? null : PopUp)}
      </WrapperForGame>
    )
  }
}

const PopUp = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: red;
`;

/* function PopUp() {
  return <div>Pop up!</div>
} */

function TimerComp(props) {
  useEffect(() => {
    if (!props.gameStatus.isGameOver) {
      const second = ++props.gameStatus.timeObj.second;

      setTimeout(() => {
        if (second < 60) {
          props.gameStatus.setTimer(
            {
              minut: props.gameStatus.timeObj.minut,
              second: second,
            }
          )
        } else {
          props.gameStatus.setTimer(
            {
              minut: ++props.gameStatus.timeObj.minut,
              second: 0,
            }
          )
        }
      }, 1000)
    }
  })

  return <div>{correctFormat(props)}</div>
}

function correctFormat(props) {
  let minut   = (props.gameStatus.timeObj.minut < 10) ? '0' + props.gameStatus.timeObj.minut : props.gameStatus.timeObj.minut; 
  let second  = (props.gameStatus.timeObj.second < 10) ? '0' + props.gameStatus.timeObj.second : props.gameStatus.timeObj.second;

  return minut + ':' + second;
}

function deleteDivElem(e) {
  const list = e.target.parentNode.querySelector('ul');
  if (list) {
    list.remove();
  }
}

function createDivElem(e, obj) {
  let list = document.createElement('ul');
  let option = document.createElement('li');
  let image = document.createElement('img');
  const sizeObj = e.target.getBoundingClientRect();

  const setVerticalCoord = (e.clientY - sizeObj.top) * 100 / sizeObj.height;
  const setHorizontalCoord = (e.clientX - sizeObj.left) * 100 / sizeObj.width;

  option.addEventListener('mousedown', () => {
    if (checkCoord(setVerticalCoord, setHorizontalCoord)) {
      gameOverAlert(e, obj);
    }
  });
  
  option.append(image);
  list.append(option);

  setStyles(list, option, image, e);
  e.target.parentNode.append(list);
}

function setStyles(list, option, image, e) {
  const sizeObj = e.target.getBoundingClientRect();
  const setVerticalCoord = (e.clientY - sizeObj.top) * 100 / sizeObj.height;
  const setHorizontalCoord = (e.clientX - sizeObj.left) * 100 / sizeObj.width;

  image.style.width = '30px';
  image.style.height = '30px';
  image.src = `${waldo}`;

  list.style.listStyle  = 'none';
  list.style.position   = 'absolute';
  list.style.top        = `${setVerticalCoord}%`;
  list.style.left       = `${setHorizontalCoord}%`;

  option.style.padding = '0.5vmin 2vmin';
  option.style.background = 'white'
}

function checkCoord(...args) {
  const WaldoCoord = {
    x1: 51.71,
    y1: 46.38,
    x2: 53.86,
    y2: 51.46,
  }

  if (args[0] >= WaldoCoord.y1 && args[0] <= WaldoCoord.y2 &&
      args[1] >= WaldoCoord.x1 && args[1] <= WaldoCoord.x2) {
    return true;
  }
  return false;
}

function gameOverAlert(e, obj) {

  let popUP = document.createElement('div');
  e.target.parentNode.append(popUP);

  Promise.resolve((obj.setGameStatus(true)))
    /* .then(() => {
      let popUP = document.createElement('div');
      e.target.parentNode.append(popUP);

      popUP.style.position = 'absolute';
      popUP.style.width = '100%';
      popUP.style.height = '100%';
      popUP.style.background = 'red';
    }) */
}