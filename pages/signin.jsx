import { useState } from "react";
import styles from "../styles/Signin.module.css";
import { useRouter } from "next/router";
import useNoAuth from "../hooks/useNoAuth";
import axiosInterceptorInstance from "../libs/api/axiosinterceptor";

const SignIn = () => {
  useNoAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInterceptorInstance.post(
        "account/public/users/signin/",
        {
          username: email,
          password,
          app: 2,
        }
      );
      const signInData = response.data;
      if (signInData) {
        setLoading(false);
        localStorage.setItem("userData", JSON.stringify(signInData));
        const referrer = "/";
        router.push(referrer);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during authentication:", error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.signin}>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
