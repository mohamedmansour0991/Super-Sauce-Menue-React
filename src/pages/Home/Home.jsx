import React, { useEffect } from "react";
import Search from "../../components/Search/Search";
import Categories from "../../components/Categories/Categories";
import Offers from "../Offers/Offers";
import Slider from "../Slider/Slider";

function Home() {
  const path = window.location.pathname.split("/")[1];
  useEffect(() => {
    if (path == "about-user" || path == "loading") {
      document.body.classList.add("bg-red");
    } else {
      document.body.classList.remove("bg-red");
    }
  }, [path]);
  return (
    <>
      <Slider />
     
      <Categories />
    </>
  );
}

export default Home;
