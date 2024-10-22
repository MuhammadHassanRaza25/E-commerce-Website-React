import { Link } from "react-router-dom";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase.js";
import { BarChartOutlined, DeleteOutlined, FieldTimeOutlined, ShopOutlined, ShoppingOutlined, TruckOutlined, UserOutlined } from "@ant-design/icons";
import Footer from "../components/Footer.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { message } from "antd";

 function AdminAllProducts(){

  // is useState main db se data get karke set kia h or map lagaya hai table main.
  const [productsFromDb, setProductsFromDb] = useState([])

  // get Real-time product data from firestore collection
  useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
			const productsData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setProductsFromDb(productsData)  // set products data in useState
		});

		// Cleanup the listener when the component is unmounted
		return () => unsubscribe();
	}, []);


  // delete product document from firestore
  let deleteProduct = async (id)=>{
    await deleteDoc(doc(db, "products", id), message.success('Product Deleted Successfully'));
  }


    return(
        <>
      {/* Admin Panel Work Start */}
         <div className="adminPanel bg-slate-600"> {/* Full body conatiner div */}

              {/* Navbar Start */}
              <nav className="bg-blue-600 flex items-center px-4 py-1.5 flex-wrap justify-between border border-b-gray-400">
               <div className="flex items-center p-4 flex-shrink-0 text-white mr-6">
                 <Link to={"/"}><span className="nav-heading font-bold text-2xl tracking-tight">Hassan Online Store <ShopOutlined></ShopOutlined></span></Link>
               </div>
               </nav>
              {/* Navbar End */}

            {/* Admin Panel Start */}
             <div className="flex">
                <div className="adminContainer1 flex flex-col pt-20 bg-white justify-start items-start w-96 h-[88vh]">
                  <Link to={'/admindashboard26'} className="w-full"><h1 className="adminHeading mb-10 pl-8 text-blue-800 bg-gray-50 flex items-center gap-4 px-3 py-2 w-full font-bold text-start text-xl"><BarChartOutlined className="text-2xl"/> Admin Dashboard</h1></Link>
                  <Link to={'/AdminAllProducts'} className="w-full"><button className="adminBtn pl-8 hover:bg-blue-50 flex items-center gap-4 bg-blue-50 text-blue-800 border-r-4 border-blue-700 px-3 py-2 w-full font-bold text-start text-xl mb-6"><ShoppingOutlined className="text-2xl"/> All Products</button></Link>
                  <Link to={'/AdminPendingProducts'} className="w-full"><button className="adminBtn pl-8 hover:bg-blue-50 hover:border-blue-50 hover:text-blue-700 flex items-center gap-4 focus:bg-blue-50 focus:text-blue-800 border-r-4 border-white focus:border-blue-700 px-3 py-2 w-full font-bold text-start text-xl mb-6"><FieldTimeOutlined className="text-2xl"/> Pending Orders</button></Link>
                  <Link to={'/AdminShippedProducts'} className="w-full"><button className="adminBtn pl-8 hover:bg-blue-50 hover:border-blue-50 hover:text-blue-700 flex items-center gap-4 focus:bg-blue-50 focus:text-blue-800 border-r-4 border-white focus:border-blue-700 px-3 py-2 w-full font-bold text-start text-xl mb-6"><TruckOutlined className="text-2xl"/> Shipped Orders</button></Link>
                </div>
            
                   <div className="bg-gray-100 w-full h-[88vh] p-10"> 
                     <h1 className='text-blue-600 mb-6 -mt-2 text-3xl font-bold flex justify-center items-center gap-2'><span className='text-black'>All</span> Products <ShoppingOutlined className="text-2xl"/></h1>
                     
                     {/* Table Work get data from db */}
                      <div className="scrollbar drop-shadow-xl w-full bg-white h-[68vh] overflow-scroll">
                           
                           <div className="flex justify-between bg-blue-600 text-white font-bold p-3">
                               <h1 className="text-start w-full">Product Title</h1>
                               <h1 className="text-start w-96 pl-5">Price</h1>
                               <h1 className="text-start w-full">Category</h1>
                               <h1 className="text-start w-full">Return Policy</h1>
                               <h1 className="text-center w-full">Delete Product</h1>
                           </div>

                           {productsFromDb.map((data)=>{
                             return(
                               <>
                                 <div className="flex justify-between bg-white text-black font-bold p-3">
                                     <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.title}</h1>
                                     <h1 className="scrollbar h-10 text-start w-96 pl-5 overflow-scroll">${data.price}</h1>
                                     <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.category}</h1>
                                     <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.returnPolicy}</h1>
                                     <h1 className="scrollbar h-10 text-center w-full overflow-scroll"><DeleteOutlined onClick={()=> deleteProduct(data.id)} className="transitionBtn bg-red-50 text-red-500 hover:text-white hover:bg-red-400 px-3 py-1.5 text-lg rounded-md"/></h1>
                                 </div>
                                 </>
                             )
                           })}
                     </div> 
                     {/* Table Work get data from db ⬆ */}
                  </div>

              </div>
          
           </div>  {/* Full body conatiner div */}

         {/* Footer */}
          <Footer/>
        </>
    )
}

export default AdminAllProducts;