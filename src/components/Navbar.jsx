import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Avatar, Badge } from "antd";
import { signOut } from "firebase/auth/cordova";
import { auth } from "../utils/firebase";
import { ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { CartContext } from '../context/CartContext'
import { message } from 'antd';

function Navbar({ searchProductsFunc, searchProducts, selectedCategoryFunc, selectedCategory, category }) {

  const [loading, setIsLoading] = useState(false);

  // Navbar Toggler
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // get user with the help of AuthContext
  const { user, setUser } = useContext(AuthContext);
  // console.log("user",user);

  //logout function
  const logoutUser = async () => {
    setIsLoading(true)
    await signOut(auth)
    message.success('Logout Successfully')
     setIsLoading(false)
  }

  //show cart length on badge.
  const { cartItems } = useContext(CartContext)

  return (
    <>
      {/* Navbar Start */}
      <header className="container w-full bg-blue-600">
        <nav className="navbar flex items-center flex-wrap justify-between px-6 py-3">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to={"/"}><span className="nav-heading font-bold text-2xl tracking-tight">Hassan Online Store <ShopOutlined></ShopOutlined></span></Link>
          </div>

          {/* Toggler button */}
          <button
            onClick={toggleNavbar}
            className="lg:hidden px-3 py-2 text-white shadow-black hover:drop-shadow-xl"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Main Div ⬇*/}
          <div className={`navIconPadding p-2 w-full lg:flex lg:items-center lg:w-auto transition-transform duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} lg:max-h-none lg:opacity-100`}>
            <div className="navInputs flex flex-col lg:flex-row lg:items-center lg:justify-end gap-5 text-sm lg:flex-grow">
              <input
                className="font-semibold p-2 w-64 rounded-md focus:outline-none focus:drop-shadow-lg placeholder:text-gray-500"
                type="text"
                value={searchProducts}
                onChange={searchProductsFunc}
                placeholder="Search Products"
              />

              <select
                value={selectedCategory}
                onChange={selectedCategoryFunc}
                className="font-semibold text-gray-500 p-2 w-64 rounded-md focus:outline-none focus:drop-shadow-lg">
                <option className="font-semibold" value="Select Category" disabled>
                  Select Category
                </option>
                <option value="">
                  All Products
                </option>
                <option>Electronics</option>
                <option>Vehicles</option>
                <option>Furniture</option>
                <option>Watches</option>
                <option>Baby Products</option>
                <option>Men Clothes</option>
                <option>Women Clothes</option>
                <option>Beauty</option>
                <option>Home Decoration</option>
                <option>Sun Glasses</option>
                <option>Groceries</option>
                <option>Fragrances</option>
                <option>Food</option>
                {/* {category.map((value, index) => ( 
                <option value={value} key={index}>
                  {value[0].toUpperCase() + value.slice(1)}
                </option>
              ))} */}
              </select>
            </div>

            {/* cart icon from ant design */}
            <Link to="/cart">
              <div className="cartIcon">
                <Badge count={cartItems.length} className="ml-5 mr-2">
                  <ShoppingCartOutlined className="text-3xl text-white cursor-pointer">
                  </ShoppingCartOutlined>
                </Badge>
              </div>
            </Link>

            {/* login/logout button & avatar ⬇*/}
            {user?.isLogin
              ?
              <>
                <div className="btnOrAvatarDiv flex items-center">
                  <button
                    className="bg-white flex justify-center ml-5 mr-5 text-blue-600 text-md font-semibold p-1.5 w-24 hover:font-bold rounded-md"
                    onClick={logoutUser}
                  >{loading ? <div className="formLoader bg-blue-600"></div> : "Logout"}</button>
                  <Avatar
                    src={user?.userInfo?.photoUrl}
                    style={{ backgroundColor: 'orange', cursor: 'pointer' }}
                    icon={<UserOutlined />}
                  />
                </div>
              </>
              :
              <>
                <div className="btnOrAvatarDiv">
                  <Link to={"/login"}>
                    <button className="bg-white ml-5 text-blue-600 text-md font-semibold p-1.5 w-24 hover:font-bold rounded-md">Login</button>
                  </Link>
                </div>
              </>
            }
            {/* login/logout button & avatar ⬆*/}
          </div>
          {/* Main Div ⬆ */}

        </nav>
        {/* Navbar End */}
      </header>
    </>
  )
}

export default Navbar;