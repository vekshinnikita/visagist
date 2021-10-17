import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectIsAuthLoading } from "@/selectors";
import { signIn } from "@/state/auth";
import SignIn from "./SignIn";
import { Redirect } from "react-router";

const SignInContainer: FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsAuthLoading);
  const dispatch = useDispatch();

  if (isAuth) return <Redirect to="/" />;

  return (
    <SignIn
      isLoading={isLoading}
      signIn={(signInData) => dispatch(signIn(signInData))}
    />
  );
};

export default SignInContainer;
