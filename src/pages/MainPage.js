import React, { useState } from "react";
import Header from "../components/Header";
import MainContent from "./compsForMainPage/MainContent";

export default function MainPage() {
  return (
    <>
      <Header />
      <MainContent gameState={false} />
      <footer>footer</footer>
    </>
  )
}