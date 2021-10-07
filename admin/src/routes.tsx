import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import CoursesContainer from "./pages/Courses/CoursesContainer";
import EditCourseContainer from "./pages/EditCourse/EditCourseContainer";
import OverviewContainer from "./pages/Overview/OverviewContainer";
import ReviewsContainer from "./pages/Reviews/ReviewsContainer";
import StudentsWorkContainer from "./pages/StudentsWork/StudentsWorkContainer";

const routes = (
  <BrowserRouter>
    <Navbar />

    <Switch>
      <Route path="/" exact component={OverviewContainer} />
      <Route path="/courses/" component={CoursesContainer} />
      <Route path="/reviews/" exact component={ReviewsContainer} />
      <Route path="/students_work/" exact component={StudentsWorkContainer} />
      <Route path="/course/:pk/" exact component={EditCourseContainer} />
    </Switch>
  </BrowserRouter>
);

export default routes;
