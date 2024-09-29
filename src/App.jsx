import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import AllProducts from "./components/AllProducts";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllProducts/>}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/Cart" element={<Cart/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;