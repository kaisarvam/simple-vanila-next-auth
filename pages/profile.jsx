import useAuth from "../hooks/useAuth";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  useAuth();

  return <Profile />;
};

export default ProfilePage;
