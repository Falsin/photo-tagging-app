import React from "react";
import Header from "../components/Header";
import MainContent from "./compsForMainPage/MainContent";

export default function GamePage() {
  return (
    <>
      <Header />
      <MainContent gameState={true} />
      <footer>footer</footer>
    </>
  )
}