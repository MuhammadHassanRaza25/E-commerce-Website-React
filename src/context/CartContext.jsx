import { createContext, useState } from "react";

export const CartContext = createContext()

function CartContextProvider({children}){
 const [cartItems, setCartItems] = useState([])

function addCartItem(item){ 
   const arr = cartItems
   const cartItemIndex = cartItems.findIndex((data)=> data.id == item.id)  //findIndex index num return krta h.
   if(cartItemIndex == -1){ 
    //means item array main nhi h to add krdo.
    arr.push({...item, quantity: 1, added: '✅'})  //add hone pe ye emoji show hogi.
   }
   else{
    //means agar item array main h to quantity plus+ krdo.
    arr[cartItemIndex].quantity++
   }
   setCartItems([...arr]) //Cart ko update kia hai.
}

function removeCartItem(id){
 const arr = cartItems
 const cartItemIndex = cartItems.findIndex((data)=> data.id == id)    //findIndex index num return krta h.
 arr.splice(cartItemIndex, 1)  //remove item.
 setCartItems([...arr])        //Cart ko update kia hai item remove krne ke baad.
}

function minusCartquantity(id){ 
    const arr = cartItems
    const cartItemIndex = cartItems.findIndex((data)=> data.id == id)  //findIndex index num return krta h.
    arr[cartItemIndex].quantity--
    setCartItems([...arr]) //Cart ko update kia hai.
 }

function isItemAdded(id){
 const arr = cartItems
 const cartItemIndex = cartItems.findIndex((data)=> data.id == id)    //findIndex index num return krta h.
 if(cartItemIndex == -1){
   return null
 }
 else{
  return arr[cartItemIndex]
 }
}

    return(
        <CartContext.Provider value={{cartItems, addCartItem, removeCartItem, isItemAdded, minusCartquantity}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;