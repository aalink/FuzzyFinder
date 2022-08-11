import React from "react";
import DogList from "../components/DogList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import SearchArea from "../components/Search";

const Home = () => {
  return (
    <div className="container">
      <SearchArea />
      <CategoryMenu />
      <DogList />
      <Cart />
    </div>
  );
};

export default Home;
