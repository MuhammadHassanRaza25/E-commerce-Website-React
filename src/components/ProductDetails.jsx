import { useState } from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";
import { CartContext } from '../context/CartContext'
import { useContext } from "react";
import { Image, message, Modal } from 'antd';
import { ShoppingFilled } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useEffect } from "react";

function ProductDetails(){
// console.log(id);
// useEffect(()=>{
//     fetch(`https://dummyjson.com/products/${id}`)
//     .then(res => res.json())
//     .then((data)=>{
//        setProducts(data)    
//     })
//     .catch((err)=> console.log('error==>', err))
// },[id])


// navbar with only login/signup for detail page.
// const [category, setCategory] = useState([])
// const fetchProducts = ()=>{
//     fetch('https://dummyjson.com/products')
//     .then((res) => res.json())
//     .then((data) =>{
//       const allCategory = data.products.map((all) => all.category);  //get category
//               const filteredCategory = [...new Set(allCategory)];   // filter category
//               setCategory(filteredCategory);  // set category to array.
//     })
//     .catch((err)=> console.log('Error=>', err))
//   }
//     // call api function //
//     useEffect(()=>{
//       fetchProducts()
//     },[])


// get user with the help of AuthContext
const {user, setUser} = useContext(AuthContext);
// console.log("user",user);

// get product id
const { id } = useParams()
const [product,setProduct]= useState({})  //get data from db.
const [title, setTitle] = useState("")
const [category, setCategory] = useState("")
const [returnPolicy, setReturnPolicy] = useState("") 
const [price, setPrice] = useState("")

useEffect(()=>{  // ye data shipped products ki collection main add hoga.
  setTitle(product.title)
  setCategory(product.category)
  setPrice(product.price)
  setReturnPolicy(product.returnPolicy)
},[product])


// get a single document data from firestore collection
let getDetailData = async ()=>{
const docRef = doc(db, "products", id);
const docSnap = await getDoc(docRef);
  setProduct({id, ...docSnap.data()})   // set single product data with id in useState Object. id isliye sath set ki hai taky button ko addtocart hone ke bad added karsakyn.
}
useEffect(()=>{
  getDetailData()
},[])
// console.log('product', product);


// cart context se addCartItem function get kia hai.
const {addCartItem, isItemAdded} = useContext(CartContext)

//Modal function Start
const [isModalOpen, setIsModalOpen] = useState(false);
const showModal = ()=>{
  setIsModalOpen(true);
  };
//Modal function End

// form details to email ⬇
const onSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  formData.append("access_key", "f305e195-a3c6-4fac-b7da-0ed612b0a3cc");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      event.target.reset();
      message.success("Order Placed Successfully")
      setIsModalOpen(false);

      // create a new collection in firestore for shipped products.
      // add products to firestore
       addDoc(collection(db, "allOrders"), {
        title: title,
        category: category,
        returnPolicy: returnPolicy,
        price: price,
      }).then(()=>{
        console.log('Data Added to db')
      })

    } 
    else{
      console.log("Error", data);
      message.error("Error")
    }
  } 
  catch(error){
    console.error('Error submitting form:', error);
    message.error("Error In Submitting Form")
  }
};
// form details to email ⬆

    return(
      <>

       {/* Modal Start */}
         <Modal centered title="Buy Now" open={isModalOpen}    
          onCancel={() => setIsModalOpen(false)}
          footer={null}>
          <form onSubmit={onSubmit}>

          {/* inputs */}
           <div className="w-full mt-5">
             <div className="flex gap-5">
               <input name="name" className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="text" placeholder="Your Name"/>
               <input required name="email" className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="text" placeholder="Your Email"/>
             </div>
             <div className="flex gap-5">
               <input required name="quantity" className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="number" placeholder="Quantity"/>
               <input required name="location" className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="text" placeholder="Your Location"/>
             </div>
           </div>

           {/* product short details in inputs */}
           <div className="mb-3 mt-1 p-1 rounded-lg">
             <input readOnly type="text" name="Product Image" className="w-full focus:outline-none font-semibold text-base p-1 mb-2 border bg-gray-100 rounded-lg" 
                value={`Product Image: ${product.productImage}`}/>
              <input readOnly type="text" name="product Title" className="w-full focus:outline-none font-semibold text-base p-1 mb-2 border bg-gray-100 rounded-lg" 
                value={`Product Title: ${product.title}`}/>
              <input readOnly type="text" name="Product Category" className="w-full focus:outline-none font-semibold text-base p-1 mb-2 border bg-gray-100 rounded-lg" 
                value={`Product Category: ${product.category}`}/>
             <input readOnly type="text" name="return Policy" className="w-full focus:outline-none font-semibold text-base p-1 mb-2 border bg-gray-100 rounded-lg" 
                value={`Return Policy: ${product.returnPolicy}`}/>
             <input readOnly type="text" name="price" className="w-full focus:outline-none font-semibold text-base p-1 mb-2 border bg-gray-100 rounded-lg" 
                value={`Price: $${product.price}`}/>
           </div>

           {/* order button */}
           {user?.isLogin 
            ?
           <div className="flex justify-center">
              <button type="submit" className="detailCartbtn bg-blue-600 hover:bg-blue-400 text-white font-medium text-base py-2 px-7">Order <ShoppingFilled></ShoppingFilled></button>
            </div>
             :
            <div className="flex justify-center">
              <button onClick={()=> message.error('Please Login')} className="detailCartbtn bg-blue-600 hover:bg-blue-400 text-white font-medium text-base py-2 px-7">Order <ShoppingFilled></ShoppingFilled></button>
            </div>
          }

          </form>
        </Modal>
      {/* Modal End */}

       <Navbar/>

      {/* Product Details Start */}
        <section className="text-gray-600 body-font overflow-hidden">
        <div className="detailContainer container p-6 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt="ecommerce"
              className="detailImg h-64 rounded"
              src={product.productImage}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-gray-600 ml-3">{product.rating}</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a href="https://github.com/MuhammadHassanRaza25" target="_blank" className="text-gray-500 hover:text-gray-900">
                  <svg
                     className="w-4 h-4"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                   >
                     <path
                       fillRule="evenodd"
                       d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                       clipRule="evenodd"
                     />
                   </svg>
                  </a>  
                </span>
              </div>
              <p className="leading-relaxed">
              {product.description}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3 font-medium text-black">Return Policy: {product.returnPolicy}</span>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3 font-medium text-black">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="detailBtnPriceDiv flex gap-2 items-center w-96">
                <span className="title-font font-medium text-xl mr-4 text-gray-900">
                  <span className="text-green-500">$</span> {product.price}
                </span>
                <button onClick={showModal} className="detailCartbtn bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-7">
                   Buy Now
                </button>

                {/* add to cart button */}
                {user?.isLogin
                ?
                <button className="detailCartbtn bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-7"
                onClick={()=> {addCartItem(product), message.success('Added to Cart Successfully')}}>
                {isItemAdded(id)? `Added ${isItemAdded(id).added}` : 'Add to Cart'}
               </button>
               :
               <button className="detailCartbtn bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-7"
               onClick={()=> message.error('Please Login')}>
                 Add to Cart
              </button>
              }

              </div>
            </div>
          </div>
        </div>
      </section>   
      {/* Product Details End */} 
      </>  
    )
}

export default ProductDetails;