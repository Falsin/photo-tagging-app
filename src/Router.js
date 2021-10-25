import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import MainComp from "./pages/MainPage";


export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={MainComp}></Route>
        <Route exact path='/gamePage' component={GamePage}></Route>
      </Switch>
    </HashRouter>
  )
}