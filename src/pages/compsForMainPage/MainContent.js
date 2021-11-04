import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebaseApp from "../../Firebase";
import waldo from '../../images/waldo.jpg';
import StyledWrapperBeforeGame from "./compsForMainContent/WrapperBeforeGame";
import StyledWrapperForGame from "./compsForMainContent/wrapperForGame/WrapperForGame";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage(firebaseApp);

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
  const [coords, setCoords] = useState(null);
  const [image, setImage] = useState(null);
  const [isGameOver, setGameStatus] = useState(false);
  const [timeObj, setTimer] = useState(
    {
      minut: 0,
      second: 0 
    })

  useEffect(() => {
    console.log(img)
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

/*   return (
    <>
    {(props.gameState) ? null : <StyledWrapperBeforeGame image={image} />}
    {(props.gameState) ? <StyledWrapperForGame propsObj={propsObj} /> : null}
    </>
  ) */

  if (!props.gameState) {
    return <StyledWrapperBeforeGame image={image} />
  } else {
    return (
      <StyledWrapperForGame propsObj={propsObj} />
    )
  }
}

const PopUp = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: red;
  z-index: 3;
`;

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

  return <div>{correctFormat(props.gameStatus.timeObj)}</div>
}

function correctFormat(props) {
  let minut   = (props.minut < 10) ? '0' + props.minut : props.minut; 
  let second  = (props.second < 10) ? '0' + props.second : props.second;

  return minut + ':' + second;
}

const WaldoList = function ({className}) {
  return (
    <ul className={className}>
      <li onClick={(e) => {
        if (checkCoord(arguments[0].coords.verticalCoord, arguments[0].coords.horizontalCoord)) {
          gameOverAlert(arguments[0].obj);
        }
      }}>
        <img src={waldo} />
      </li>
    </ul>
  )
}

const StyledComp = styled(WaldoList)`
  list-style: none;
  position: absolute;
  top: ${props => props.coords.verticalCoord}%;
  left: ${props => props.coords.horizontalCoord}%;

  li {
    padding: 0.5vmin 2vmin;
    background: white;

    img {
      width: 30px;
      height: 30px;
    }
  }
`;

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

function gameOverAlert(obj) {
  obj.setGameStatus(true);
}