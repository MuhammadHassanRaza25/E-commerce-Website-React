import { ArrowLeftOutlined } from '@ant-design/icons';
import { CartContext } from '../context/CartContext'
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import { Modal, message } from 'antd';
import { ShoppingFilled } from "@ant-design/icons";
import { AuthContext } from '../context/AuthContext';

function Cart() {

  // get user with the help of AuthContext
  const { user, setUser } = useContext(AuthContext);
  // console.log("user",user);

  // cart ke context se cartItems get kiye hain.
  const { cartItems, removeCartItem, addCartItem, minusCartquantity } = useContext(CartContext)
  // console.log("cartItems", cartItems);

  //total amount & quantity functionality
  const totalAmount = cartItems.reduce((totalVal, Obj) => totalVal + Obj.quantity * Obj.price, 0)
  const totalAmountFinal = Math.floor(totalAmount) //without decimal price aygi.
  const totalQuantity = cartItems.reduce((totalVal, Obj) => totalVal + Obj.quantity, 0)

  //Modal function Start
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  //Modal function End

  // form details to email ⬇
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "f305e195-a3c6-4fac-b7da-0ed612b0a3cc");

    // Product Details
    let productDetails = cartItems.map(order => {
      return `Product Image: ${order.productImage} \n Title: ${order.title} \n Price: ${order.price} \n`;
    })

    // Append product details to form data
    formData.append("products", productDetails);

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
      }
      else {
        console.log("Error", data);
        message.error("Error")
      }
    }
    catch (error) {
      console.error('Error submitting form:', error);
      message.error("Error In Submitting Form")
    }
  };
  // form details to email ⬆

  return (
    <>
      {/* Cart Heading */}
      <h1 className='headingCart text-blue-500 flex flex-wrap justify-center items-center gap-2 mt-20'><Link to={'/'}><ArrowLeftOutlined className='arrow mr-10 p-2 bg-gray-100 text-3xl text-blue-500 rounded-full hover:text-gray-100 hover:bg-blue-600 transition-all'></ArrowLeftOutlined></Link> <span className='text-black'>Shopping</span> Cart <img className='headingCartIcon w-12' src={'https://cdn-icons-gif.flaticon.com/15713/15713014.gif'} alt="image" /></h1>

      {/* Total amount & quantity ⬇ */}
      <div className='cartDetailsDiv flex flex-wrap justify-center gap-10 mb-14'>
        <div className='cartDiv mb-3 py-5 p-5 rounded-3xl w-80 border-2 border-gray-200'>
          <h1 className='text-4xl font-bold text-center'>Total Amount</h1>
          <h2 className='text-2xl font-bold text-center mt-5'><span className="text-green-500">$</span>{totalAmountFinal}</h2>
        </div>

        <div className='cartDiv mb-3 py-5 p-5 rounded-3xl w-80 border-2 border-gray-200'>
          <h1 className='text-4xl font-bold text-center'>Total Quantity</h1>
          <h2 className='text-2xl font-bold text-center mt-5'>{totalQuantity}</h2>
        </div>

        <div className='cartDiv mb-3 py-5 p-5 rounded-3xl w-80 border-2 border-gray-200'>
          <h1 className='text-4xl font-bold text-center'>Checkout 💳</h1>
          <button onClick={showModal} className="btn bg-blue-600 hover:bg-blue-400 mt-5 w-full text-white font-medium rounded-lg text-md px-5 py-3 text-center">Checkout</button>
        </div>
      </div>
      {/* Total amount & quantity ⬆ */}

      {/* Modal Start */}
      <Modal centered title="Buy Now" open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}>
        <form onSubmit={onSubmit}>

          {/* inputs */}
          <div className="w-full mt-5">
            <div className="flex gap-5">
              <input name="name" className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="text" placeholder="Your Name" />
              <input required name="email" className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="text" placeholder="Your Email" />
            </div>
            <div className="flex gap-5">
              <input required name="location" className="mb-4 border-2 font-semibold rounded-lg focus:outline-none placeholder:text-gray-500 w-full p-3" type="text" placeholder="Your Location" />
            </div>
          </div>

          {/* product short details in inputs */}
          <div className="mb-3 mt-1 p-1 rounded-lg">
            <input readOnly type="text" name="Total Amount" className="w-full focus:outline-none font-semibold text-base p-1 mb-2 border bg-gray-100 rounded-lg"
              value={`Total Amount: $${totalAmount}`} />
            <input readOnly type="text" name="Total Quantity" className="w-full focus:outline-none font-semibold text-base p-1 mb-2 border bg-gray-100 rounded-lg"
              value={`Total Quantity: ${totalQuantity}`} />
          </div>

          {/* order button */}
          {user?.isLogin
            ?
            <div className="flex justify-center">
              <button type="submit" className="detailCartbtn bg-blue-600 hover:bg-blue-400 text-white font-medium text-base py-2 px-7">Checkout <ShoppingFilled></ShoppingFilled></button>
            </div>
            :
            <div className="flex justify-center">
              <button onClick={() => message.error('Please Login')} className="detailCartbtn bg-blue-600 hover:bg-blue-400 text-white font-medium text-base py-2 px-7">Checkout <ShoppingFilled></ShoppingFilled></button>
            </div>
          }

        </form>
      </Modal>
      {/* Modal End */}

      {/* Showing Carts data using map ⬇ */}
      {cartItems.map((data) => {
        return (
          <>
            <section>
              <div className="w-full max-w-6xl md:px-5 lg-6 mx-auto">
                <div className="cartDiv rounded-3xl border-2 border-gray-200 p-4 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
                  <div className="col-span-12 lg:col-span-2">
                    <img
                      src={data.productImage}
                      alt="image"
                      className="cartImg w-full lg:w-[180px] rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                    <div className="flex items-center justify-between w-full mb-4">
                      <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                        {data.title}
                      </h5>
                      <button onClick={() => removeCartItem(data.id)} className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
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
                          onClick={() => minusCartquantity(data.id)}
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
                          onClick={() => addCartItem(data)}
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
                      <h6 className="font-manrope font-bold text-2xl leading-9 text-right">
                        <span className="text-green-500">$</span>{data.price}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )
      })}
      {/* Showing Carts data using map ⬆ */}

      {/* Footer Start */}
      <div className='mt-20 bg-gray-50 border-t border-gray-300'><Footer /></div>
      {/* Footer End */}

    </>
  )
}

export default Cart;