import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAlert } from "@/state/alert";
import { selectAlertMessage } from "@/selectors";
import Alert from "./Alert";

const AlertContainer: FC = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectAlertMessage);

  return <Alert message={message} resetAlert={() => dispatch(resetAlert())} />;
};

export default AlertContainer;
