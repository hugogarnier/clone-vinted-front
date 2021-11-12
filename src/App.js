import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Sell from "./pages/Sell";
import Footer from "./components/Footer";
require("dotenv").config();

function App() {
  const [token, setToken] = useState(null);
  const [productName, setProductName] = useState("");

  const setUser = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 10 });
    } else {
      Cookies.remove("token");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header
        setToken={setToken}
        token={token}
        setUser={setUser}
        productName={productName}
        setProductName={setProductName}
      />
      <Routes>
        <Route path='/' exact element={<Home productName={productName} />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
