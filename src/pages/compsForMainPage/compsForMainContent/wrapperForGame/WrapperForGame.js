import React from "react";
import styled from "styled-components";
import PopUp from "./popUp/PopUp";
import TimerComp from "./timerComp/TimerComp";
import waldo from "../../../../images/waldo.jpg";

function WrapperForGame({className}) {

  return (
    <section className={className}>
      <TimerComp {...arguments[0].propsObj} />
      <img src={arguments[0].propsObj.img} onClick={(e) => {
        const sizeObj = e.target.getBoundingClientRect();
        const verticalCoord = (e.clientY - sizeObj.top) * 100 / sizeObj.height;
        const horizontalCoord = (e.clientX - sizeObj.left) * 100 / sizeObj.width;
        arguments[0].propsObj.setCoords({
          verticalCoord: verticalCoord,
          horizontalCoord: horizontalCoord
        })
      }}/>
      {(arguments[0].propsObj.coords === null) ? null : <StyledComp {...arguments[0].propsObj} />}
      {!arguments[0].propsObj.isGameOver ? null : <PopUp time={arguments[0].propsObj.timeObj}/>}
    </section>
  )
}

const StyledWrapperForGame = styled(WrapperForGame)`
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;

  img {
    display: block;
    max-width: 100vmax;
  }
`;

const WaldoList = function ({className}) {
  return (
    <ul className={className}>
      <li onClick={(e) => {
        if (checkCoord(arguments[0].coords.verticalCoord, arguments[0].coords.horizontalCoord)) {
          gameOverAlert(arguments[0]);
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
  top: ${props => {
    return props.coords.verticalCoord + '%';
    }
  };
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

function gameOverAlert(arg) {
  arg.setGameStatus(true);
}

export default StyledWrapperForGame;