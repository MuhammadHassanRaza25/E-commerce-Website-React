import { Link } from "react-router-dom";
import { BarChartOutlined, FieldTimeOutlined, LoadingOutlined, ShopOutlined, ShoppingOutlined, TruckOutlined } from "@ant-design/icons";
import { useState } from "react";
import { message, Modal } from "antd";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db } from "../utils/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../utils/firebase.js";
import Footer from "../components/Footer.jsx";


function AdminDashboard(){

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [returnPolicy, setReturnPolicy] = useState("") 
  const [rating, setRating] = useState("")  
  const [productImage, setProductImage] = useState("")
  const [price, setPrice] = useState("")
  const [addProductLoading, setAddProductLoading] = useState(false)

//get image file via input and set in useState
let getImgFile = (e)=>{
  let imgFile = e.target.files[0]
  setProductImage(imgFile)
}

// Firestore & Storage Work ⬇
const productsStorageRef = ref(storage, productImage.name);
let addProductFunc = ()=>{  //add product button's function

  setAddProductLoading(true) //button small loader

  //upload image file to the firebase storage & Create a collection and add products.
  uploadBytes(productsStorageRef, productImage).then((snapshot) => {
    console.log('Uploaded a blob or file!');

    // get image url from storage
    getDownloadURL(productsStorageRef)
    .then((url) => { 
      // console.log('url====', url);

        // add products to firestore
        addDoc(collection(db, "products"), {
          title: title,
          description: description,
          category: category,
          returnPolicy: returnPolicy,
          rating: rating,
          price: price,
          productImage: url
        }).then(()=>{
          message.success('Product Added Successfully')
          console.log('Data Added to db')
          setAddProductLoading(false)  
          setIsModalOpen(false);
        })
      
    })
    .catch((err)=> console.log(err))

  })
  .catch((err)=> console.log(err))

}
// Firestore & Storage Work ⬆

//Modal function Start
const [isModalOpen, setIsModalOpen] = useState(false);
const showModal = ()=>{
  setIsModalOpen(true);
  };
//Modal function End

    return(
        <>
        {/* Modal Start */}
        <Modal centered title="Add Product" open={isModalOpen}    
          onCancel={() => setIsModalOpen(false)}
          footer={null}>

          {/* inputs */}
           <div className="w-full mt-5">
             <div className="flex gap-5">
                 <input onChange={(e)=> setTitle(e.target.value)} className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-2" type="text" placeholder="Product Title" />
                 <input onChange={(e)=> setDescription(e.target.value)} className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="text" placeholder="Product Description" />
             </div>
             <div className="flex gap-5">
                <select onChange={(e)=> setCategory(e.target.value)} className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3">
                   <option disabled selected>Select Cateory</option>
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
                </select>
                <input onChange={(e)=> setReturnPolicy(e.target.value)} className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="text" placeholder="Return Policy" />
             </div>
             <div className="flex gap-5">
                <input onChange={(e)=> setRating(e.target.value)}  className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="number" placeholder="Enter Product Rating" />
             </div>
             <div className="flex gap-5">
                <input onChange={getImgFile} className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="file" />
                 <input onChange={(e)=> setPrice(e.target.value)} className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3"  type="text" placeholder="Product Price" />
             </div>
           </div>

           {/* order button */}
           {addProductLoading
             ?
             <div className="flex justify-center">
                <button onClick={addProductFunc} className="ml-8 mt-3 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg w-48 font-bold text-center text-lg">Adding <LoadingOutlined /></button>
              </div>
             :
             <div className="flex justify-center">
               <button onClick={addProductFunc} className="ml-8 mt-3 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg w-48 font-bold text-center text-lg">Add Product</button>
             </div>
           }

        </Modal>
        {/* Modal End */}

        {/* Admin Panel Work */}
          <div className="adminPanel bg-slate-600">    {/* Full body conatiner div */}

              {/* Navbar Start */}
              <nav className="bg-blue-600 flex items-center px-4 py-1.5 flex-wrap justify-between border border-b-gray-400">
               <div className="flex items-center p-4 flex-shrink-0 text-white mr-6">
                 <Link to={"/"}><span className="nav-heading font-bold text-2xl tracking-tight">Hassan Online Store <ShopOutlined></ShopOutlined></span></Link>
               </div>
               </nav>
              {/* Navbar End */}

            {/* Admin Panel Start */}
             <div className="adminDash flex">
                <div className="adminContainer1 flex flex-col pt-24 bg-white justify-start items-start w-96 h-[88vh]">
                  <h1 className="adminHeading mb-10 pl-8 text-blue-800 bg-gray-50 flex items-center gap-4 px-3 py-2 w-full font-bold text-start text-xl"><BarChartOutlined className="text-2xl"/> Admin Dashboard</h1>
                  <Link to={'/AdminAllProducts'} className="w-full"><button className="adminBtn pl-8 hover:bg-blue-50 hover:border-blue-50 hover:text-blue-700 flex items-center gap-4 focus:bg-blue-50 focus:text-blue-800 border-r-4 border-white focus:border-blue-700 px-3 py-2 w-full font-bold text-start text-xl mb-6"><ShoppingOutlined className="text-2xl"/> All Products</button></Link>
                  <Link to={'/AdminAllOrders'} className="w-full"><button className="adminBtn pl-8 hover:bg-blue-50 hover:border-blue-50 hover:text-blue-700 flex items-center gap-4 focus:bg-blue-50 focus:text-blue-800 border-r-4 border-white focus:border-blue-700 px-3 py-2 w-full font-bold text-start text-xl mb-6"><TruckOutlined className="text-2xl"/> All Orders</button></Link>
                  <button className="adminBtnadd ml-8 mt-3 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg w-56 font-bold text-center text-lg" onClick={showModal}>Add Product</button>
                </div>
            
                <div className="flex items-center justify-center bg-gray-200 w-full h-[88vh]">
                  <img className="adminImg drop-shadow-2xl brightness-125" width={'350px'} src="https://cdn3d.iconscout.com/3d/premium/thumb/business-team-doing-online-analysis-3d-icon-download-in-png-blend-fbx-gltf-file-formats--analytics-logo-pack-icons-6294252.png" alt="image" />
                </div>
             </div>
          
          </div>   {/* Full body conatiner div */}

         {/* Footer */}
          <Footer/>
        </>
    )
}

export default AdminDashboard;