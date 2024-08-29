import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Cards from './components/Cards'

function App() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])

  const fetchProducts = ()=>{
      fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) =>{
        setProducts(data.products)   // set products to array.
        const allCategory = data.products.map((all) => all.category);  //get category
				const filteredCategory = [...new Set(allCategory)];   // filter category
				setCategory(filteredCategory);  // set category to array.
      });
    
    }

useEffect(()=>{
  fetchProducts()
},[])

//checking data
// {products.map((value)=>{
//   console.log(value);
// })
// }

  return (
    <>
 {/* Navbar Start */}
     <nav className="navbar flex items-center flex-wrap justify-between p-6 border border-b-gray-400">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <span className="nav-heading font-bold text-2xl tracking-tight">Hassan Online Store</span>
   </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="navInputs flex justify-end gap-5 text-sm lg:flex-grow">
      
      <input className="font-semibold p-2 w-64 rounded-md focus:outline-none focus:drop-shadow-lg placeholder:text-gray-500" 
       type="text" placeholder="Search Products"/>

      <select className="font-semibold text-gray-500 p-2 w-64 rounded-md focus:outline-none focus:drop-shadow-lg">
        <option className="font-semibold" value="Select Category" disabled selected>Select Category</option>
        <option className="font-semibold" value="All Products">All Products</option>
        {category.map((value, index) => (    //show category using map.
						<option value={value} key={index}>{value[0].toUpperCase() + value.slice(1)}</option> //First Letter UpperCase kia h.
					))}         
      </select>

    </div>
  </div>
     </nav>
 {/* Navbar End */}

 {/* Cards Start */}
 <h1 className='heading'><span className='text-black'>Latest</span> Products</h1>
 
 <div className='flex flex-wrap justify-evenly mb-32 mt-7'>
  {products.map((value)=>(
     <Cards
     category={value.category}
     key={value.id}
     images={value.images}
     description={value.description}
     price={value.price}
     title={value.title}
     id={value.id}
     rating={value.rating}
   />
    ))}
  </div>
 {/* Cards End */}

 {/* Footer Start*/}
    <Footer/>
 {/* Footer End */}
    </>
  )
}

export default App;
