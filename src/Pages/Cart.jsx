import { ArrowLeftOutlined } from '@ant-design/icons';
import { CartContext } from '../context/CartContext'
import { useContext } from "react";
import { Link } from 'react-router-dom';

function Cart(){

// cart context se cartItems get kiye hain.
const {cartItems, removeCartItem, addCartItem, minusCartquantity} = useContext(CartContext)
console.log("cartItems",cartItems);

//total amount & quantity functionality
const totalAmount = cartItems.reduce((totalVal,Obj)=> totalVal+Obj.quantity * Obj.price, 0)
const totalQuantity = cartItems.reduce((totalVal,Obj)=> totalVal+Obj.quantity, 0)

    return(
    <>   
    <h1 className='headingCart'><span className='text-black'><Link to={'/'}><ArrowLeftOutlined className='text-cyan-400 hover:text-cyan-300'></ArrowLeftOutlined></Link> Shopping</span> Cart</h1>
    
    {/* total amount & quantity ⬇ */}
      <div className='cartDetailsDiv flex flex-wrap justify-center gap-10 mb-14'>
        <div className='cartDiv mb-3 py-6 p-5 rounded-3xl w-96 border-2 border-gray-200'>
          <h1 className='text-4xl font-bold text-center'>Total Amount</h1>
          <h2 className='text-2xl font-semibold text-center mt-5'>{totalAmount}</h2>
        </div>
  
        <div className='cartDiv mb-3 py-6 p-5 rounded-3xl w-96 border-2 border-gray-200'>
          <h1 className='text-4xl font-bold text-center'>Total Quantity</h1>
          <h2 className='text-2xl font-semibold text-center mt-5'>{totalQuantity}</h2>
        </div>
  
        <div className='cartDiv mb-3 py-6 p-5 rounded-3xl w-96 border-2 border-gray-200'>
          <h1 className='text-4xl font-bold text-center'>CheckOut</h1>
          <button className="btn mt-5 w-full text-white font-medium rounded-lg text-md px-5 py-3 text-center">CheckOut</button>
        </div>
      </div>
   {/* total amount & quantity ⬆ */}
 
    {/* Showing Carts */}
    {cartItems.map((data)=>{
     return(
        <section>
        <div className="w-full max-w-7xl md:px-5 lg-6 mx-auto">        
          <div className="cartDiv rounded-3xl border-2 border-gray-200 hover:border-cyan-400 p-4 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
            <div className="col-span-12 lg:col-span-2">
              <img
                src={data.thumbnail}
                alt="image"
                className="cartImg w-full lg:w-[180px] rounded-lg object-cover"
              />
            </div>
            <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div className="flex items-center justify-between w-full mb-4">
                <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                  {data.title}
                </h5>
                <button onClick={()=> removeCartItem(data.id)} className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                  <svg
                    width={34}
                    height={34}
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                      cx={17}
                      cy={17}
                      r={17}
                      fill=""
                    />
                    <path
                      className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                      d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                {data.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button 
                   disabled={data.quantity <= 1} 
                   onClick={()=> minusCartquantity(data.id)}
                   className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      width={18}
                      height={19}
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 9.5H13.5"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <h1 className="flex items-center justify-center border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100">
                     {data.quantity}
                  </h1>
                  <button 
                   onClick={()=> addCartItem(data)}
                   className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      width={18}
                      height={19}
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                       d="M3.75 9.5H14.25M9 14.75V4.25"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <h6 className="text-cyan-400 font-manrope font-bold text-2xl leading-9 text-right">
                  {data.price}
                </h6>
              </div>
            </div>
          </div>
        </div>     
     </section>
     )
    })}
    </>
    )
}

export default Cart;