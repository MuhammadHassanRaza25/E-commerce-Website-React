import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import AllProducts from "./components/AllProducts";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAllProducts from "./admin/AdminAllProducts";
import AdminAllOrders from "./admin/AdminAllOrders";

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllProducts/>}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/Cart" element={<Cart/>}></Route>
        <Route path="/admindashboard26" element={<AdminDashboard/>}></Route>
        <Route path="/AdminAllProducts" element={<AdminAllProducts/>}></Route>
        <Route path="/AdminAllOrders" element={<AdminAllOrders/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;