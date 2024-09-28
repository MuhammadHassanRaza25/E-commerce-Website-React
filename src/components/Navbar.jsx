import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Avatar } from "antd";
import { signOut } from "firebase/auth/cordova";
import { auth } from "../utils/firebase";  

function Navbar({searchProductsFunc, searchProducts, selectedCategoryFunc, selectedCategory, category}){

// Navbar Toggler
const [isOpen, setIsOpen] = useState(false);
const toggleNavbar = () => {
    setIsOpen(!isOpen);
};

// get user with the help of context
const {user, setUser} = useContext(AuthContext);
console.log("user",user);

//logout function
const logoutUser = async()=>{
  await signOut(auth)
  // window.location.href = "/"
}

    return(
     <>
       {/* Navbar Start */}
         <nav className="navbar flex items-center flex-wrap justify-between p-5 border border-b-gray-400">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to={"/"}><span className="nav-heading font-bold text-2xl tracking-tight">Hassan Online Store</span></Link>
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
  
        {/* Navigation items */}
        <div className={`w-full lg:flex lg:items-center lg:w-auto transition-transform duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} lg:max-h-none lg:opacity-100`}>
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
              <option className="font-semibold" value="">
                All Products
              </option>
              {category.map((value, index) => ( 
                <option value={value} key={index}>
                  {value[0].toUpperCase() + value.slice(1)}  {/* value get karke first latter upperCase kia h. */}
                </option>
              ))}
            </select>
          </div>
          {user?.isLogin
           ?
           <>
           <div className="btnOrAvatarDiv">
            <Link to={"/Login"}>
             <button 
             className="bg-white ml-5 mr-5 text-blue-600 text-md font-semibold p-1.5 w-24 hover:font-bold rounded-md"
             onClick={logoutUser}
             >Logout</button>
            </Link>
            <Avatar src={user?.userInfo.photoUrl} size="large"/>
            </div>
           </>
          :
          <>
          <div className="btnOrAvatarDiv">
            <Link to={"/Login"}>
              <button className="bg-white ml-5 text-blue-600 text-md font-semibold p-1.5 w-24 hover:font-bold rounded-md">Login</button>
            </Link>
          </div>
          </>
          }
        </div>
        </nav>
      {/* Navbar End */}
   </>
 )
}

export default Navbar;