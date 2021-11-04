import React from "react";
import styled from "styled-components";
import correctFormat from "../../../../../commonFunc/correctFormat";

function PopUp({className}) {
  return (
    <div className={className}>
      You finished in {correctFormat(props.timeObj)}
    </div>
  )
}

const StyledPopUp = styled(PopUp)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: red;
  z-index: 3;
`

export default StyledPopUp;