import React from "react";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout/Layout";
import Carousel from "../components/Carousal/Carousal";
import { slides } from "../data/carouselData.json";

const Home = () => {
  useAuth();

  return (
    <Layout>
      <Carousel data={slides} />
    </Layout>
  );
};

export default Home;
