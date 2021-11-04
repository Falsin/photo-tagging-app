import React from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";

function WrapperBeforeGame({className}) {
  return (
    <section className={className}>
      <h2>Level 1</h2>

      <Link to="/gamePage" >
        <img src={arguments[0].image}></img>
      </Link>
    </section>
  )
}

const StyledWrapperBeforeGame = styled(WrapperBeforeGame)`
  h2 {
    text-align: center;
  }

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

export default StyledWrapperBeforeGame;