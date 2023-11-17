import React from "react";
import Layout from "../Layout/Layout";
import Carousel from "../Carousal/Carousal";
import { slides } from "../../data/carouselData.json";

const Home = () => {
  return (
    <Layout>
      <Carousel data={slides} />
    </Layout>
  );
};

export default Home;
