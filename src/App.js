import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Sell from "./pages/Sell";
require("dotenv").config();

function App() {
  return (
    <Router>
      <Helmet>
        <title>Clone Vinted</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
