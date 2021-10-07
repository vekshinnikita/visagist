import { FC } from "react";

export const Option: FC = () => {
  return <div className="option"></div>;
};

export const Select: FC = ({ children }) => {
  const defaultOption = children?.toString();

  return <div className="select"></div>;
};
