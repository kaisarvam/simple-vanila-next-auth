import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Profile.module.css";
import Layout from "../Layout/Layout";
import axiosInterceptorInstance from "../../libs/api/axiosinterceptor";

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const fetchProfileData = useCallback(async () => {
    try {
      const response = await axiosInterceptorInstance.get(
        "account/public/users/profile/"
      );
      const profileData = response.data;
      if (profileData) {
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during profile data fetch:", error);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInterceptorInstance.patch(
        "account/public/users/profile/",
        {
          first_name: firstName,
          last_name: lastName,
        }
      );
      if (response.status === 200) {
        fetchProfileData();
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
    localStorage.removeItem("userData");
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
