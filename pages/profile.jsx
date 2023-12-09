import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Profile.module.css";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout/Layout";

const Profile = () => {
  useAuth();

  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setToken(parsedUserData.token);
    }
  }, []);

  const fetchProfileData = useCallback(async (token) => {
    try {
      const response = await fetch(
        "https://eservice.vemate.com/api/v1/account/public/users/profile/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        const profileData = await response.json();
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during profile data fetch:", error);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProfileData(token);
    }
  }, [fetchProfileData, token]);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://eservice.vemate.com/api/v1/account/public/users/profile/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
          }),
        }
      );

      if (response.ok) {
        fetchProfileData(token);
      } else {
        setLoading(false);
        console.error("Profile update failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during profile update:", error);
    }
  };

  const handleSignOut = () => {
    // Clear user data from local storage
    localStorage.removeItem("userData");
    // Redirect to signin page
    router.push("/signin");
  };

  return (
    <Layout>
      <div className={styles.profileContainer}>
        <h1>Profile Page</h1>

        <div className={styles.profileContent}>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.input}
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.input}
          />
          <button
            onClick={handleUpdateProfile}
            className={styles.button + " " + styles.update}
            disabled={loading}
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
          <button
            onClick={handleSignOut}
            className={styles.button + " " + styles.signout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
