import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import MainComp from "./MainPage";

export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={MainComp}></Route>
      </Switch>
    </HashRouter>
  )
}