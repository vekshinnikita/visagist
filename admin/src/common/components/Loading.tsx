import { FC } from "react";

export const Loading: FC = () => {
  return (
    <div className="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const LoadingMask: FC = () => {
  return (
    <div className="loading-mask">
      <Loading />
    </div>
  );
};
