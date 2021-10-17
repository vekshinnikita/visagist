import { FC } from "react";
import { useSelector } from "react-redux";
import { selectIsAuth } from "@/selectors";
import Navbar from "./Navbar";

const NavbarContainer: FC = () => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Navbar /> : <></>;
};

export default NavbarContainer;
