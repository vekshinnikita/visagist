import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./common/components/PrivateRoute";
import AlertContainer from "./layout/AlertContainer";
import NavbarContainer from "./layout/NavbarContainer";
import CoursesContainer from "./pages/Courses/CoursesContainer";
import EditCourseContainer from "./pages/EditCourse/EditCourseContainer";
import OverviewContainer from "./pages/Overview/OverviewContainer";
import ReviewsContainer from "./pages/Reviews/ReviewsContainer";
import SignInContainer from "./pages/SignIn/SignInContainer";
import StudentsWorkContainer from "./pages/StudentsWork/StudentsWorkContainer";

const routes = (
  <BrowserRouter>
    <NavbarContainer />

    <Switch>
      <PrivateRoute path="/" exact component={OverviewContainer} />
      <PrivateRoute path="/courses/" component={CoursesContainer} />
      <PrivateRoute path="/reviews/" exact component={ReviewsContainer} />
      <PrivateRoute
        path="/students_work/"
        exact
        component={StudentsWorkContainer}
      />
      <PrivateRoute path="/course/:pk/" exact component={EditCourseContainer} />
      <Route path="/sign_in/" exact component={SignInContainer} />
    </Switch>

    <AlertContainer />
  </BrowserRouter>
);

export default routes;
