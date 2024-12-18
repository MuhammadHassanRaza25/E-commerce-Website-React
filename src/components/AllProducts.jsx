import {useEffect, useState } from 'react'
import '../App.css'
import Footer from './Footer'
import Cards from './Cards'
import Navbar from './Navbar'
import { Carousel } from "antd";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../utils/firebase'
import { data } from 'autoprefixer'

// slider image style
const sliderImg = {
  height: '60vh',
  width: '100vw'
};

function AllProducts() { 
  // const [category, setCategory] = useState([])
  // const fetchProducts = ()=>{
  //     fetch('https://dummyjson.com/products')
  //     .then((res) => res.json())
  //     .then((data) =>{
  //       setProducts(data.products)   // set products to array.
  //       const allCategory = data.products.map((all) => all.category);  //get category
  //               const filteredCategory = [...new Set(allCategory)];   // filter category
  //               setCategory(filteredCategory);  // set category to array.
  //     })
  //     .catch((err)=> console.log('Error=>', err))
  //  }   

  //checking data
  // {products.map((value)=>{
  //   console.log(value);
  // })
  // }

  // call api function //
  // useEffect(()=>{
  //   setLoading(false)
  //   fetchProducts()
  // },[])


  const [products, setProducts] = useState([])  //isme db se data get kia h.
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchProducts, setSeachProducts] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  

  // get Real-time product data from firestore collection
  useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
			const productsData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setProducts(productsData)  // set products data in useState
      // console.log('productsData',productsData);
      setLoading(false)
		});

		// Cleanup the listener when the component is unmounted
		return () => unsubscribe();
	}, []);


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
  // at the last setFilteredProducts(filtered); means (filtered varible) ko useState main push krdia. then map lagake cards ka data show krdia.
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

      {loading ? (
          <div className="bg-white w-full h-screen fixed top-0 left-0 flex justify-center items-center">
            <div className="loader">&nbsp;</div>
         </div>
      )
      : 
      (
        <>
          {/* Navbar Start */}
          <Navbar
          searchProductsFunc={searchProductsFunc}
          searchProducts={searchProducts}
          selectedCategoryFunc={selectedCategoryFunc}
          selectedCategory={selectedCategory}
          // category={category}
          />
          {/* Navbar End */}

          {/* Slider Start */}
          <Carousel autoplay>
            <div>
               <img className='sliderImage'  style={sliderImg} src="https://storage.googleapis.com/macrovector-acl-eu/previews/55609/thumb_55609.webp" alt="image" />
            </div>
            <div>
               <img className='sliderImage'  style={sliderImg} src="https://muhammadhassanraza25.github.io/Hassan-Raza-Store/images/img2.jpg" alt="image" />
            </div>
            <div>
                <img className='sliderImage' style={sliderImg} src="https://t4.ftcdn.net/jpg/03/45/73/61/360_F_345736111_up8XDxSYwaoOfSC88vQTPTpA3QhI3OSn.jpg" alt="image" />
            </div>
          </Carousel>
         {/* Slider End */}

          {/* heading */}
          <h1 className='heading text-blue-500 flex justify-center items-center gap-2'><span className='text-black'>Latest</span> Products <img className='headingIcon w-12' src={'https://cdn.dribbble.com/users/656025/screenshots/2782309/tienda.gif'} alt="image" /></h1>
          
          {/* Cards Start */}
          <div className='flex flex-wrap justify-evenly mb-32 mt-3'>
           {filteredProducts.map((value)=>(
              <Cards
              category={value.category}
              images={value.productImage}
              description={value.description}
              price={value.price}
              title={value.title}
              id={value.id}
              rating={value.rating}
              data={value}
            />
          ))} 
        </div>
         {/* Cards End */}
  
         {/* Footer Start */}
          <Footer/>
         {/* Footer End */}
        </>
      )}

      </>
    )
  }
  
  export default AllProducts;