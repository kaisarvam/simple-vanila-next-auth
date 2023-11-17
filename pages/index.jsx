import React from "react";
import useAuth from "../hooks/useAuth";
import Home from "../components/Home/Home";

const HomePage = () => {
  useAuth();

  return <Home />;
};

export default HomePage;
