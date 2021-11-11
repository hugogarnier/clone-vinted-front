import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
require("dotenv").config();

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
