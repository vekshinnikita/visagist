import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import CourseDetail from "./pages/Home/components/CourseDetail";
import HomeContainer from "./pages/Home/HomeContainer";



const routes = (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact component={HomeContainer} />
      <Route path="/courses/:pk/" exact component={CourseDetail}/>
    </Switch>

  </BrowserRouter>
);

export default routes;
