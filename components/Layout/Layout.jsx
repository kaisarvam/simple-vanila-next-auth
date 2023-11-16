// components/Layout.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user.full_name);
    } else {
      router.push("/signin");
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.navbar}>
          <Link legacyBehavior href="/">
            <a className={router.pathname === "/" ? styles.active : ""}>Home</a>
          </Link>
          <Link legacyBehavior href="/profile">
            <a className={router.pathname === "/profile" ? styles.active : ""}>
              Profile
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
