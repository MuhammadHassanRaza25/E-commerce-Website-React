import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import AllProducts from "./components/AllProducts";

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllProducts/>}></Route>
        <Route path="/products">
         <Route index element={<AllProducts />} ></Route>
         <Route path=":id" element={<ProductDetails />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;