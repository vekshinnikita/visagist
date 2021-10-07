import { FC } from "react";

const Workspace: FC = ({ children }) => {
  return (
    <div
      className="workspace"
      style={{
        boxShadow:
          children?.toString().length === 0
            ? "0 1px 30px rgb(0 0 0 / 40%)"
            : "none",
      }}
    >
      {children}
    </div>
  );
};

export default Workspace;
