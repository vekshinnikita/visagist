import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/state/components";
import { Pages } from "@/typing/entities";
import Home from "./Home";

const HomeContainer: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(Pages.HOME));
  }, []);
  return <Home />;
};

export default HomeContainer;
