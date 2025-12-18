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
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/admin" element={<AdminDashboard/>}></Route>
        <Route path="/admin/allproducts" element={<AdminAllProducts/>}></Route>
        <Route path="/admin/allorders" element={<AdminAllOrders/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;