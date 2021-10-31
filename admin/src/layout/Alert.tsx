import { FC, useEffect, useRef } from "react";

interface AlertProps {
  message: string;
  resetAlert: () => void;
}

const Alert: FC<AlertProps> = ({ message, resetAlert }) => {
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alertNode = alertRef.current;

    if (alertNode && message) {
      alertNode.classList.remove("alert-hide");
      alertNode.classList.add("alert-show");
      setTimeout(() => {
        alertNode.classList.remove("alert-show");
        setTimeout(() => {
          alertNode.classList.add("alert-hide");
          resetAlert();
        }, 600);
      }, 2000);
    }
  }, [alertRef, message, resetAlert]);

  return (
    <div className="alert alert-hide" ref={alertRef}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
