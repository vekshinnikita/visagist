import { FC, ChangeEvent } from "react";
import { useInput } from "@/hooks";
import { SignInData } from "@/types/models";

interface SignInProps {
  isLoading: boolean;
  signIn: (signInData: SignInData) => void;
}

const SignIn: FC<SignInProps> = ({ isLoading, signIn }) => {
  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername,
  } = useInput();
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ username, password });
    resetUsername();
    resetPassword();
  };

  return (
    <main className="sign-in">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="base-input"
          placeholder="Имя пользователя"
          {...bindUsername}
        />
        <input
          type="text"
          className="base-input"
          placeholder="Пароль"
          {...bindPassword}
        />
        <button type="submit" className="button">
          Войти
        </button>
      </form>
    </main>
  );
};

export default SignIn;
