import { createContext, useState, useEffect } from "react";
import "../App.css"
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "../utils/firebase"

export const AuthContext = createContext()
function AuthContextProvider({children}){
  const [user, setUser] = useState({
    isLogin: false,
    userInfo: {}
  })

  const [loading, setLoading] = useState(true)
  // Handle user state changes    ====> react native fierebase website se lia hai.
  function onAuthChanged(user) {
      if(user){
        setUser({isLogin: true, 
          userInfo: {
            name: user?.displayName,
            photoUrl: user?.photoURL,
            email: user?.email
        }});
      }
      else{
        setUser({isLogin: false, userInfo:{}});
      }
      setLoading(false);
    }
  
    useEffect(() => {
      const subscriber = onAuthStateChanged(auth, onAuthChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

  return(
    <AuthContext.Provider value={{user, setUser}}>
        {loading
         ?
         <div className="bg-[#ededed] w-full h-screen fixed top-0 left-0 flex justify-center items-center">
            <div className="loader">&nbsp;</div>
         </div>
        :
        children
      }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;