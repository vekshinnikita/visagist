import React, { FC } from "react";
import Intro from "./components/Intro";
import VisagisteCourse from "./components/VisagisteCourse";

const Home: FC = () => {
  return (
    <main className="home">
      <Intro />
      <VisagisteCourse />
    </main>
  );
};

export default Home;
