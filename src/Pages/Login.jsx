import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import "../App.css"
import {message} from 'antd';

function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  // signin/login user
  const signInUser = async ()=>{
   try{
    await signInWithEmailAndPassword(auth, email, password).then(()=>{ 
     message.success('Login Successfully')
     setTimeout(() => {
      navigate('/')
     }, 1000);
    })
   }
   catch(err){
    console.log(err);
    const errorCode = err.code
    if(errorCode == 'auth/missing-password'){
      message.error('Password is missing!')
    }
    else if(errorCode == 'auth/invalid-credential'){
      message.error('Incorrect Password')
    }
    else if(errorCode == 'auth/invalid-email'){
      message.error('Invalid Email')
    }
    else if(errorCode == 'auth/missing-password'){
      message.error('Password is missing!')
    }
   }
  }

// signin with google
  const signInwithGoogleFunc = ()=>{
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Result=>", result);
      
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("User=>", user);

      message.success('Login Successfully')
      setTimeout(() => {
       navigate('/')
     }, 1000);

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log("Error=>", errorCode, errorMessage);
    });
  
  }

    return(
        <>
         <div className="bg-gray-100 flex items-center justify-center h-screen w-full">
           <div className="loginForm p-5">
            <h1 className="flex justify-center font-bold text-4xl py-5">Login</h1>
            
            {/* inputs ⬇ */}
            <div className="mb-5 mt-8">
               <input type="email" 
               className="input text-gray-900 text-md rounded-lg w-full p-3 placeholder:font-semibold" 
               placeholder="Email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
             </div>
             <div className="mb-5 mt-7">
               <input type="password" 
               className="input text-gray-900 text-md rounded-lg w-full p-3 placeholder:font-semibold" 
               placeholder="Password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
             </div>
             {/* inputs ⬆ */}

            {/* buttons ⬇ */}
             <button className="loginSignupBtn mt-5 p-3 text-white font-bold text-lg rounded-lg"
             onClick={signInUser}>Login</button>
             <p className="flex justify-center gap-1 mt-3 font-medium text-gray-500">Don't have an account? <Link to={"/Signup"} className="text-blue-500 hover:underline">Signup</Link></p>
             
             <hr className="mt-6 mb-1.5 border" />

             <div className="flex justify-center">
              <button onClick={signInwithGoogleFunc} className="flex gap-10 items-center justify-center bg-gray-100 w-full text-gray-500 text-lg font-semibold p-2.5 rounded-lg mt-5">
               <img className="w-8" src={"https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png"}/> 
               Continue With Google
              </button>
            </div>
            {/* buttons ⬆ */}

           </div>
         </div>
        </>
    ) 
}

export default Login;