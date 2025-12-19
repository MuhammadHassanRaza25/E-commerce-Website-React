import { CloseOutlined, TruckOutlined } from "@ant-design/icons";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase.js";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { message } from "antd";
import { AdminContext } from "../context/AdminContext.jsx";
import AdminLayout from "./AdminLayout.jsx";

function AdminAllOrders() {

  const { isAdmin } = useContext(AdminContext);

  // is useState main db se data get karke set kia h or map lagaya hai table main.
  const [ordersFromDb, setOrdersFromDb] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  // get Real-time product data from firestore collection
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(db, "allOrders"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrdersFromDb(productsData)  // set products data in useState
      setIsLoading(false);
      // console.log('ordersFromDb', ordersFromDb);
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  // delete order document from firestore
  let rejectOrder = async (id) => {
    try {
      await deleteDoc(doc(db, "allOrders", id));
      message.success('Order Rejected Successfully');
    } catch (err) {
      console.error(err);
      message.error('Failed to reject order');
    }
  }

  return (
    <>
      <AdminLayout activeMenu="orders">
        <div className="bg-gray-100 w-full h-screen flex flex-col justify-center lg:p-16 md:p-16 p-5">
          <h1 className='text-blue-600 mb-10 -mt-2 text-3xl font-bold text-center'><span className='text-black'>All</span> Orders <TruckOutlined className="text-2xl" /></h1>

          {isAdmin ? (
            <div className="scrollbar drop-shadow-xl w-full bg-white h-[68vh] overflow-scroll">

              <div className="flex justify-between bg-blue-600 text-white font-bold p-3">
                <h1 className="scrollbar overflow-x-scroll text-start w-full">Product Title</h1>
                <h1 className="scrollbar overflow-x-scroll text-start w-96 pl-5">Price</h1>
                <h1 className="scrollbar overflow-x-scroll text-center w-full">Category</h1>
                <h1 className="scrollbar overflow-x-scroll text-center w-full">Return Policy</h1>
                <h1 className="scrollbar overflow-x-scroll text-center w-full">Reject Order</h1>
              </div>

              {isLoading ? <div className="flex justify-center items-center h-full"><div className="formLoader bg-blue-500 w-12"></div></div>
                : ordersFromDb.map((data) => {
                  return (
                    <div key={data.id} className="flex justify-between bg-white text-black font-bold p-3">
                      <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.title}</h1>
                      <h1 className="scrollbar h-10 text-start w-96 pl-5 overflow-scroll">${data.price}</h1>
                      <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.category}</h1>
                      <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.returnPolicy}</h1>
                      <h1 className="scrollbar h-10 text-center w-full overflow-scroll"><CloseOutlined onClick={() => rejectOrder(data.id)} className="transitionBtn bg-red-50 text-red-500 hover:text-white hover:bg-red-400 px-3 py-1.5 text-lg rounded-md" /></h1>
                    </div>
                  )
                })}
            </div>
          )
            : (
              <div className="scrollbar drop-shadow-xl w-full bg-white h-[68vh] overflow-scroll">

                <div className="flex justify-between bg-blue-600 text-white font-bold p-3">
                  <h1 className="scrollbar overflow-x-scroll text-start w-full">Product Title</h1>
                  <h1 className="scrollbar overflow-x-scroll text-start w-96 pl-5">Price</h1>
                  <h1 className="scrollbar overflow-x-scroll text-center w-full">Category</h1>
                  <h1 className="scrollbar overflow-x-scroll text-center w-full">Return Policy</h1>
                </div>

                {isLoading ? <div className="flex justify-center items-center h-full"><div className="formLoader bg-blue-500 w-12"></div></div>
                  : ordersFromDb.map((data) => {
                    return (
                      <div key={data.id} className="flex justify-between bg-white text-black font-bold p-3">
                        <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.title}</h1>
                        <h1 className="scrollbar h-10 text-start w-96 pl-5 overflow-scroll">${data.price}</h1>
                        <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.category}</h1>
                        <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.returnPolicy}</h1>
                      </div>
                    )
                  })}
              </div>
            )
          }
        </div>
      </AdminLayout>
    </>
  )
}

export default AdminAllOrders;