import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import HomeContainer from "./pages/Home/HomeContainer";

const routes = (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact component={HomeContainer} />
      <Route path="/courses/" exact />
    </Switch>
  </BrowserRouter>
);

export default routes;
