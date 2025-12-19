import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase.js";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { message } from "antd";
import { AdminContext } from "../context/AdminContext.jsx";
import AdminLayout from "./AdminLayout.jsx";

function AdminAllProducts() {

  const { isAdmin } = useContext(AdminContext);

  // is useState main db se data get karke set kia h or map lagaya hai table main.
  const [productsFromDb, setProductsFromDb] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  // get Real-time product data from firestore collection
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductsFromDb(productsData)  // set products data in useState
      setIsLoading(false);
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);


  // delete product document from firestore
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      message.success('Product Deleted Successfully');
    } catch (err) {
      message.error('Failed to delete product');
      console.error(err);
    }
  }


  return (
    <>
      <AdminLayout activeMenu="products">
        <div className="bg-gray-100 w-full h-screen flex flex-col justify-center lg:p-16 md:p-16 p-5">
          <h1 className='text-blue-600 mb-10 -mt-2 text-3xl font-bold flex justify-center items-center gap-2'><span className='text-black'>All</span> Products <ShoppingOutlined className="text-2xl" /></h1>
          {/* admin login nahi hoga to delete ka btn show nhi hoga. */}
          {isAdmin ? (
            <div className="scrollbar drop-shadow-xl w-full bg-white h-[68vh] overflow-scroll">

              <div className="flex justify-between bg-blue-600 text-white font-bold p-3">
                <h1 className="scrollbar overflow-x-scroll text-start w-full">Product Title</h1>
                <h1 className="scrollbar overflow-x-scroll text-start w-96 pl-5">Price</h1>
                <h1 className="scrollbar overflow-x-scroll text-center w-full">Category</h1>
                <h1 className="scrollbar overflow-x-scroll text-center w-full">Return Policy</h1>
                <h1 className="scrollbar overflow-x-scroll text-center w-full">Delete Product</h1>
              </div>

              {isLoading ? <div className="flex justify-center items-center h-full"><div className="formLoader bg-blue-500 w-12"></div></div>
                :
                productsFromDb.map((data) => {
                  return (
                    <div key={data.id} className="flex justify-between bg-white text-black font-bold p-3">
                      <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.title}</h1>
                      <h1 className="scrollbar h-10 text-start w-96 pl-5 overflow-scroll">${data.price}</h1>
                      <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.category}</h1>
                      <h1 className="scrollbar h-10 text-center w-full overflow-scroll">{data.returnPolicy}</h1>
                      <h1 className="scrollbar h-10 text-center w-full overflow-scroll"><DeleteOutlined onClick={() => deleteProduct(data.id)} className="transitionBtn bg-red-50 text-red-500 hover:text-white hover:bg-red-400 px-3 py-1.5 text-lg rounded-md" /></h1>
                    </div>
                  )
                })}
            </div>
          )
            : (
              <div className="scrollbar drop-shadow-xl w-full bg-white h-[68vh] overflow-scroll">

                <div className="flex justify-between bg-blue-600 text-white font-bold p-3">
                  <h1 className="scrollbar overflow-x-scroll text-start w-full">Product Title</h1>
                  <h1 className="scrollbar overflow-x-scroll text-start w-full pl-5">Price</h1>
                  <h1 className="scrollbar overflow-x-scroll text-start w-full">Category</h1>
                  <h1 className="scrollbar overflow-x-scroll text-start w-96">Return Policy</h1>
                </div>

                {isLoading ? <div className="flex justify-center items-center h-full"><div className="formLoader bg-blue-500 w-12"></div></div>
                  :
                  productsFromDb.map((data) => {
                    return (
                      <div key={data.id} className="flex justify-between bg-white text-black font-bold p-3">
                        <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.title}</h1>
                        <h1 className="scrollbar h-10 text-start w-full pl-5 overflow-scroll">${data.price}</h1>
                        <h1 className="scrollbar h-10 text-start w-full overflow-scroll">{data.category}</h1>
                        <h1 className="scrollbar h-10 text-start w-96 overflow-scroll ">{data.returnPolicy}</h1>
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

export default AdminAllProducts;