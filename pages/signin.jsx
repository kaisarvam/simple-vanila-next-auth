import useNoAuth from "../hooks/useNoAuth";
import SignIn from "../components/SignIn/SignIn";

const SignInPage = () => {
  useNoAuth();

  return <SignIn />;
};

export default SignInPage;
