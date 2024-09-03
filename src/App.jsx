import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Cards from './components/Cards'

function App() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchProducts, setSeachProducts] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([]);

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
    //checking data
    // {products.map((value)=>{
    //   console.log(value);
    // })
    // }

// call api function //
useEffect(()=>{
  fetchProducts()
},[])


// Products Filter Functionality ⬇ //
useEffect(() => {
  let filtered = products;
  if (selectedCategory) {
    filtered = filtered.filter((productData) =>(
      productData.category === selectedCategory
    ));
  }
  if (searchProducts) {
    filtered = filtered.filter((productData) =>(
      productData.title.toLowerCase().includes(searchProducts.toLowerCase())
    ));
  }
  setFilteredProducts(filtered);
}, [selectedCategory, searchProducts, products]);

//Summary: Simple hamny (filtered varible) main products leliye phir unko filter() karke products ka data lelia.
// then if ki conditions main ushi (filtered varible) ko update kia or conditions lagayin.
// at the last setFilteredProducts(filtered); means (filtered varible) ko useState main push krdia. then ma lagake cards ka data show krdia.

// Products Filter Functionality ⬆ //


// ⬇ Functions For get values of search input & select.⬇ //
const searchProductsFunc = (e)=>{
   //console.log(e.target.value);  //get search input value.
   setSeachProducts(e.target.value)
}

const selectedCategoryFunc = (e)=>{
  // console.log(e.target.value);  //get select value.
  setSelectedCategory(e.target.value)
}
// ⬆ Functions For get values of search input & select.⬆ //

  return (
    <>
 {/* Navbar Start */}
     <nav className="navbar flex items-center flex-wrap justify-between p-6 border border-b-gray-400">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <span className="nav-heading font-bold text-2xl tracking-tight">Hassan Online Store</span>
   </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="navInputs flex items-center justify-end gap-5 text-sm lg:flex-grow">
      
      <input className="font-semibold p-2 w-64 rounded-md focus:outline-none focus:drop-shadow-lg placeholder:text-gray-500" 
       type="text" value={searchProducts} onChange={searchProductsFunc} placeholder="Search Products"/>

      <select value={selectedCategory} onChange={selectedCategoryFunc} className="font-semibold text-gray-500 p-2 w-64 rounded-md focus:outline-none focus:drop-shadow-lg">
        <option className="font-semibold" value="Select Category" disabled selected>Select Category</option>
        <option className="font-semibold" value="">All Products</option>
        {category.map((value, index) => (    //show category using map.
						<option value={value} key={index}>{value[0].toUpperCase() + value.slice(1)}</option> //First Letter UpperCase kia h.
					))}         
      </select>

      {/* cart icon */}
      <svg class="h-7 w-7 text-white shadow-black cursor-pointer hover:drop-shadow-xl"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="9" cy="21" r="1" />  <circle cx="20" cy="21" r="1" />  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
      {/* cart icon */}
    
    </div>
  </div>
     </nav>
 {/* Navbar End */}

 {/* Cards Start */}
 <h1 className='heading'><span className='text-black'>Latest</span> Products</h1>
 
 <div className='flex flex-wrap justify-evenly mb-32 mt-7'>
  {filteredProducts.map((value)=>(
     <Cards
     category={value.category}
     key={value.id}
     images={value.thumbnail}
     description={value.description}
     price={value.price}
     title={value.title}
     id={value.id}
     rating={value.rating}
   />
    ))} 
       <div className="flex justify-center items-center h-32">
        <p className="text-center text-cyan-400 text-2xl font-semibold"><span className='text-black'>Products</span> Not Found</p>
      </div>
  </div>
 {/* Cards End */}

 {/* Footer Start*/}
    <Footer/>
 {/* Footer End */}
    </>
  )
}

export default App;
