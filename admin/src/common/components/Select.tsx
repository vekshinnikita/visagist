import { Children, FC, isValidElement, ReactNode } from "react";

interface SelectOptionProps {
  default?: boolean | undefined;
}

export const SelectOption: FC<SelectOptionProps> = () => {
  return <div className="option"></div>;
};

export const Select: FC = ({ children }) => {
  let defaultOptionNode: ReactNode = null;
  Children.forEach(children, (element) => {
    if (!isValidElement(element)) return;

    defaultOptionNode = element.props.default ? element : null;
  });

  return <div className="select">{defaultOptionNode}</div>;
};
