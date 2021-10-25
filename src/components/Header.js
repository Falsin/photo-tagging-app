import React from "react";
import styled from "styled-components";
import UserContainer from "./compsForHeader/UserContainer";

const Wrapper = styled.header`
  position: relative;
  display: flex;
  width: 100%;
  height: 10vmin;
  background: darkblue;
`;

export default function Header() {
  return (
    <Wrapper>
      <h1>Where's Waldo</h1>
      <UserContainer />
    </Wrapper>
  )
}