import React from "react";
import DogList from "../components/DogList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import SearchArea from "../components/Search";
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div className="container">
      <SearchArea />
      <CategoryMenu />
      <DogList />
      <Cart />
      <Footer />
    </div>
  );
};

export default Home;
