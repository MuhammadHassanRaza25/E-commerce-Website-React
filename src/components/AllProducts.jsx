import { useEffect, useState } from 'react'
import '../App.css'
import Footer from './Footer'
import Cards from './Cards'
import Navbar from './Navbar'

function AllProducts() {
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
      })
      .catch((err)=> console.log('Error=>', err))
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
        <Navbar
        searchProductsFunc={searchProductsFunc}
        searchProducts={searchProducts}
        selectedCategoryFunc={selectedCategoryFunc}
        selectedCategory={selectedCategory}
        category={category}
        />
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
        </div>
       {/* Cards End */}
  
       {/* Footer Start */}
          <Footer/>
       {/* Footer End */}
      </>
    )
  }
  
  export default AllProducts;