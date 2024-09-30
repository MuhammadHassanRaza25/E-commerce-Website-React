import { createUserWithEmailAndPassword ,GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {message} from 'antd';

function Signup(){
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  // signup user
  const signupUser = async ()=>{
    try{
      await createUserWithEmailAndPassword(auth, email, password).then(()=>{
       message.success('Signup Successfully')
       setTimeout(() => {
        navigate('/Login')
       }, 1000);
      })
     }
     catch(err){
      console.log(err);
      const errorCode = err.code
      if(errorCode == 'auth/email-already-in-use'){
        message.error('This Email Is Already In Use!')
      }
      else if(errorCode == 'auth/weak-password'){
        message.error('Your password must be atleast 6 characters')
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
           <div className="signupForm p-5">
            <h1 className="flex justify-center font-bold text-4xl py-3">Signup</h1>
            
            {/* inputs ⬇ */}
            <div className="mb-5 mt-8">
               <input type="name" 
               className="input text-gray-900 text-md rounded-lg w-full p-3 placeholder:font-semibold" 
               placeholder="Your Name" required value={username} onChange={(e)=> setUsername(e.target.value)}/>
             </div>
            <div className="mb-5 mt-4">
               <input type="email" 
               className="input text-gray-900 text-md rounded-lg w-full p-3 placeholder:font-semibold" 
               placeholder="abc@gmail.com" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
             </div>
             <div className="mb-5 mt-4">
               <input type="password" 
               className="input text-gray-900 text-md rounded-lg w-full p-3 placeholder:font-semibold" 
               placeholder="Your Password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
             </div>
             {/* inputs ⬆ */}

            {/* buttons ⬇ */}
             <button className="loginSignupBtn mt-3 p-3 text-white font-bold text-lg rounded-lg"
             onClick={signupUser}>Signup</button>
             <p className="flex justify-center gap-1 mt-3 font-medium text-gray-500">Already have an account? <Link to={"/Login"} className="text-blue-500 hover:underline">Login</Link></p>
            
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

export default Signup;