import { Link } from "react-router-dom";
import { BarChartOutlined, CloseOutlined, ShopOutlined, ShoppingOutlined, TruckOutlined, UserOutlined } from "@ant-design/icons";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase.js";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../components/Footer.jsx";
import { message, Space } from "antd";
import Modal from "antd/es/modal/Modal.js";
import Avatar from "antd/es/avatar/avatar.js";

function AdminAllOrders(){
    
    // is useState main db se data get karke set kia h or map lagaya hai table main.
    const [ordersFromDb, setOrdersFromDb] = useState([])

    // get Real-time product data from firestore collection
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "allOrders"), (snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrdersFromDb(productsData)  // set products data in useState
        console.log('ordersFromDb', ordersFromDb);
      });
  
      // Cleanup the listener when the component is unmounted
      return () => unsubscribe();
    }, []);

  // delete order document from firestore
  let rejectOrder = async (id)=>{
    await deleteDoc(doc(db, "allOrders", id), message.success('Order Rejected Successfully'));
  }


   //Modal function Start
   const [isModalOpen, setIsModalOpen] = useState(false);
   const showModal = ()=>{
   setIsModalOpen(true);
   };
    //Modal function End
 
   //admin login/logout functionality ⬇
   const [adminEmailInp, setAdminEmailInp] = useState("")
   const [adminPassInp, setAdminPassInp] = useState("")
   const [adminEmail, setAdminEmail] = useState("")
   const [adminPass, setAdminPass] = useState("")
 
   useEffect(()=>{
     setAdminEmail("admin@gmail.com")
     setAdminPass("admin@1226")
   },[])
 
   var get = localStorage.getItem('isAdmin');
   let convertBooleanType = JSON.parse(get)
   const [isAdmin, setIsAdmin] = useState(convertBooleanType)
 
   let adminLogin = ()=>{
     if(adminEmailInp == adminEmail && adminPassInp == adminPass){
       message.success("Admin Login Successfully")
       setIsModalOpen(false)
       setIsAdmin(true)
       localStorage.setItem('isAdmin', 'true');
     }
     else{
       message.error("Wrong Email/Password")
     }
   }
   
   let adminLogout = ()=>{
     message.success("Admin Logout Successfully")
     setIsAdmin(false)
     localStorage.setItem('isAdmin', 'false');
   }
   // console.log('isAdmin', isAdmin);
   //admin login/logout functionality ⬆

    return(
        <>
        {/* Admin  Modal Start */}
         <Modal centered title="Admin Login" open={isModalOpen}    
          onCancel={() => setIsModalOpen(false)}
          footer={null}>

          {/* inputs */}
           <div className="w-full mt-5">
             <div className="flex flex-col">
                 <input onChange={(e)=> setAdminEmailInp(e.target.value)} className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-2" type="text" placeholder="Admin Email" />
                 <input onChange={(e)=> setAdminPassInp(e.target.value)} className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="password" placeholder="Admin Password" />
                 <button onClick={adminLogin} className="mt-2 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg w-full font-bold text-center text-lg">Login</button>
             </div>
           </div>
        </Modal>
        {/* Admin Modal End */}

      {/* Admin Panel Work Start */}
         <div className="adminPanel bg-slate-600"> {/* Full body conatiner div */}

              {/* Navbar Start */}
              <nav className="bg-blue-600 flex items-center px-4 py-1.5 flex-wrap justify-between border border-b-gray-400">
               <div className="flex items-center p-4 flex-shrink-0 text-white mr-6">
                 <Link to={"/"}><span className="nav-heading font-bold text-2xl tracking-tight">Hassan Online Store <ShopOutlined></ShopOutlined></span></Link>
               </div>
                 <div className="btnOrAvatarDiv flex items-center">
                    {isAdmin?
                    <>
                       <Space size={16} wrap>
                        <Avatar size={40} style={{ backgroundColor: 'white', color: '#f56a00' }} src={'https://cdn3d.iconscout.com/3d/premium/thumb/businessman-3d-icon-download-in-png-blend-fbx-gltf-file-formats--employee-manager-worker-business-avatar-pack-people-icons-8266515.png?f=webp'} />
                       </Space>
                       <button 
                         onClick={adminLogout}
                         className="bg-white ml-5 mr-5 text-blue-600 text-md font-semibold p-1.5 w-24 hover:font-bold rounded-md"
                       >Logout</button>
                       </>
                      :
                       <button 
                         onClick={showModal}
                         className="bg-white ml-5 mr-5 text-blue-600 text-md font-semibold p-1.5 w-24 hover:font-bold rounded-md"
                       >Login</button>
                    }
                </div>

               </nav>
              {/* Navbar End */}

            {/* Admin Panel Start */}
             <div className="adminDash flex">
                <div className="adminContainer2 flex flex-col pt-24 bg-white justify-start items-start w-96 h-[88vh]">
                  <Link to={'/admindashboard'} className="w-full"><h1 className="adminHeading mb-10 pl-8 text-blue-800 bg-gray-50 flex items-center gap-4 px-3 py-2 w-full font-bold text-start text-xl"><BarChartOutlined className="text-2xl"/> Admin Dashboard</h1></Link>
                  <Link to={'/AdminAllProducts'} className="w-full"><button className="adminBtn pl-8 hover:bg-blue-50 hover:border-blue-50 hover:text-blue-700 flex items-center gap-4 focus:bg-blue-50 focus:text-blue-800 border-r-4 border-white focus:border-blue-700 px-3 py-2 w-full font-bold text-start text-xl mb-6"><ShoppingOutlined className="text-2xl"/> All Products</button></Link>
                  <Link to={'/AdminAllOrders'} className="w-full"><button className="adminBtn pl-8 hover:bg-blue-50 flex items-center gap-4 bg-blue-50 text-blue-800 border-r-4 border-blue-700 px-3 py-2 w-full font-bold text-start text-xl mb-6"><TruckOutlined className="text-2xl"/> All Orders</button></Link>
                </div>
            
                 <div className="flex items-center justify-center bg-gray-100 w-full h-[88vh]">
                     <div className="bg-gray-100 w-full h-[88vh] p-10"> 
                          <h1 className='text-blue-600 mb-6 -mt-2 text-3xl font-bold text-center'><span className='text-black'>All</span> Orders <TruckOutlined className="text-2xl"/></h1>
                          
                          {isAdmin?(
                            <div className="scrollbar drop-shadow-xl w-full bg-white h-[68vh] overflow-scroll">
                                
                              <div className="flex justify-between bg-blue-600 text-white font-bold p-3">
                                  <h1 className="scrollbar overflow-x-scroll text-start w-full">Product Title</h1>
                                  <h1 className="scrollbar overflow-x-scroll text-start w-96 pl-5">Price</h1>
                                  <h1 className="scrollbar overflow-x-scroll text-center w-full">Category</h1>
                                  <h1 className="scrollbar overflow-x-scroll text-center w-full">Return Policy</h1>
                                  <h1 className="scrollbar overflow-x-scroll text-center w-full">Reject Order</h1>
                              </div>

                              {ordersFromDb.map((data)=>{
                                return(
                                  <>
                                    <div className="flex justify-between bg-white text-black font-bold p-3">
                                        <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.title}</h1>
                                        <h1 className="scrollbar h-10 text-start w-96 pl-5 overflow-scroll">${data.price}</h1>
                                        <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.category}</h1>
                                        <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.returnPolicy}</h1>
                                        <h1 className="scrollbar h-10 text-center w-full overflow-scroll"><CloseOutlined onClick={()=> rejectOrder(data.id)} className="transitionBtn bg-red-50 text-red-500 hover:text-white hover:bg-red-400 px-3 py-1.5 text-lg rounded-md"/></h1>
                                    </div>
                                    </>
                                )
                              })}
                           </div> 
                          )
                          :(
                          <div className="scrollbar drop-shadow-xl w-full bg-white h-[68vh] overflow-scroll">
                                
                            <div className="flex justify-between bg-blue-600 text-white font-bold p-3">
                                <h1 className="scrollbar overflow-x-scroll text-start w-full">Product Title</h1>
                                <h1 className="scrollbar overflow-x-scroll text-start w-96 pl-5">Price</h1>
                                <h1 className="scrollbar overflow-x-scroll text-center w-full">Category</h1>
                                <h1 className="scrollbar overflow-x-scroll text-center w-full">Return Policy</h1>
                            </div>

                            {ordersFromDb.map((data)=>{
                              return(
                                <>
                                  <div className="flex justify-between bg-white text-black font-bold p-3">
                                      <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.title}</h1>
                                      <h1 className="scrollbar h-10 text-start w-96 pl-5 overflow-scroll">${data.price}</h1>
                                      <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.category}</h1>
                                      <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.returnPolicy}</h1>
                                  </div>
                                  </>
                              )
                            })}
                         </div> 
                          )
                          }

                          {/* Table Work get data from db */}
                            {/* <div className="scrollbar drop-shadow-xl w-full bg-white h-[68vh] overflow-scroll">
                                
                                <div className="flex justify-between bg-blue-600 text-white font-bold p-3">
                                    <h1 className="scrollbar overflow-x-scroll text-start w-full">Product Title</h1>
                                    <h1 className="scrollbar overflow-x-scroll text-start w-96 pl-5">Price</h1>
                                    <h1 className="scrollbar overflow-x-scroll text-center w-full">Category</h1>
                                    <h1 className="scrollbar overflow-x-scroll text-center w-full">Return Policy</h1>
                                    <h1 className="scrollbar overflow-x-scroll text-center w-full">Reject Order</h1>
                                </div>

                                {ordersFromDb.map((data)=>{
                                  return(
                                    <>
                                      <div className="flex justify-between bg-white text-black font-bold p-3">
                                          <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.title}</h1>
                                          <h1 className="scrollbar h-10 text-start w-96 pl-5 overflow-scroll">${data.price}</h1>
                                          <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.category}</h1>
                                          <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.returnPolicy}</h1>
                                          <h1 className="scrollbar h-10 text-center w-full overflow-scroll"><CloseOutlined onClick={()=> rejectOrder(data.id)} className="transitionBtn bg-red-50 text-red-500 hover:text-white hover:bg-red-400 px-3 py-1.5 text-lg rounded-md"/></h1>
                                      </div>
                                      </>
                                  )
                                })}
                          </div>  */}
                          {/* Table Work get data from db ⬆ */}
                    </div>
                 </div>
             </div>
          
           </div>  {/* Full body conatiner div */}

         {/* Footer */}
          <Footer/>
        </>
    )
}

export default AdminAllOrders;