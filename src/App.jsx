import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import { Container } from "react-bootstrap";
import Offers from "./pages/Offers/Offers";
import Categories from "./components/Categories/Categories";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/Category/Category";
import Card from "./pages/Card/Card";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import About from "./pages/About/About";
import FormUser from "./pages/FormUser/FormUser";
import Loading from "./pages/Loading/Loading";
import Notification from "./pages/Notification/Notification";

function App() {
  const [count, setCount] = useState(0);
  const path = window.location.pathname.split("/")[1];
  useEffect(() => {
    if (path == "about-user" || path == "loading") {
      document.body.classList.add("bg-red");
    } else {
      document.body.classList.remove("bg-red");
    }
  }, [path]);
  // Function to set data in localStorage with expiration time
  function setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  // Function to get data from localStorage with expiration check
  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      // Remove the item from localStorage if it's expired
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  // Set data with a 24-hour expiration time
  setWithExpiry("exampleKey", "exampleValue", 24 * 60 * 60 * 1000);

  // Get data with expiration check
  const retrievedValue = getWithExpiry("exampleKey");
  console.log(retrievedValue); // Will be 'exampleValue' if not expired, or null if expired

  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path="/category/:id" element={<Category />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/card" element={<Card />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-user" element={<FormUser />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
        {/* <Search /> */}
        {/* <Offers /> */}
        {/* <Categories /> */}
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
