import { useState } from "react";
import styles from "../styles/Signin.module.css";
import { useRouter } from "next/router";
import useNoAuth from "../hooks/useNoAuth";

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
      const response = await fetch(
        "https://eservice.vemate.com/api/v1/account/public/users/signin/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password,
            app: 2,
          }),
        }
      );

      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        console.log("response :", data);
        localStorage.setItem("userData", JSON.stringify(data));
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
