import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";
import { CartContext } from '../context/CartContext'
import { useContext } from "react";

function ProductDetails(){

const { id } = useParams()
const [products,setProducts]= useState('')
console.log(products.id);

useEffect(()=>{
    fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then((data)=>{
       setProducts(data)    
    })
    .catch((err)=> console.log('error==>', err))
},[id])

// navbar with only login/signup for detail page.
const [category, setCategory] = useState([])
const fetchProducts = ()=>{
    fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((data) =>{
      const allCategory = data.products.map((all) => all.category);  //get category
              const filteredCategory = [...new Set(allCategory)];   // filter category
              setCategory(filteredCategory);  // set category to array.
    })
    .catch((err)=> console.log('Error=>', err))
  }
    // call api function //
    useEffect(()=>{
      fetchProducts()
    },[])

// cart context se addCartItem function get kia hai.
const {addCartItem, isItemAdded} = useContext(CartContext)

    return(
      <>
       <Navbar
        category={category}
       />

        <section className="text-gray-600 body-font overflow-hidden">
        <div className="detailContainer container p-6 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="detailImg lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={products.thumbnail}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {products.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {products.title}
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
                  <span className="text-gray-600 ml-3">{products.rating}</span>
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
              {products.description}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3 font-medium text-black">Return Policy: {products.returnPolicy}</span>
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
              <div className="detailBtnPriceDiv flex gap-28 items-center w-96">
                <span className="title-font font-medium text-2xl mr-4 text-gray-900">
                  <span className="text-green-500">$</span> {products.price}
                </span>
                <button className="detailCartbtn text-white font-medium py-2 px-7"
                 onClick={()=> addCartItem(products)}>
                 {isItemAdded(id)? `Added ${isItemAdded(id).added}` : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>    
      </>  
    )
}

export default ProductDetails;