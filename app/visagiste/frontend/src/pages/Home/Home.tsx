import React, { FC } from "react";
import Intro from "./components/Intro";
import VisagisteCourse from "./components/VisagisteCourse";


const Home: FC = () => {
  return (
    <main className="home">
      <div>
        <Intro />
        <VisagisteCourse />
      </div>
    </main>
  );
};

export default Home;
