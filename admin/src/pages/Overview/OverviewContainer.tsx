import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Pages } from "@/types/enumerates";
import { highlightPage } from "@/state/components";
import Overview from "./Overview";

const OverviewContainer: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(highlightPage(Pages.OVERVIEW));
  }, [dispatch]);

  return <Overview />;
};

export default OverviewContainer;
