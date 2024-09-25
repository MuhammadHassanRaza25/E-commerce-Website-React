import { Link } from "react-router-dom";

function Login(){
    return(
        <>
         <div className="bg-gray-100 flex items-center justify-center h-screen w-full">
           <div className="loginForm p-5">
            <h1 className="flex justify-center font-bold text-4xl py-5">Login</h1>
            
            {/* inputs ⬇ */}
            <div class="mb-5 mt-8">
               <input type="email" className="input text-gray-900 text-md rounded-lg w-full p-3 placeholder:font-semibold" placeholder="Email" required />
             </div>
             <div class="mb-5 mt-7">
               <input type="password" className="input text-gray-900 text-md rounded-lg w-full p-3 placeholder:font-semibold" placeholder="Password" required />
             </div>
             {/* inputs ⬆ */}

            {/* buttons ⬇ */}
             <button className="loginSignupBtn mt-5 p-3 text-white font-bold text-lg rounded-lg">Login</button>
             <p className="flex justify-center gap-1 mt-3 font-medium text-gray-500">Don't have an account? <Link to={"/Signup"} className="text-blue-500 hover:underline">Signup</Link></p>
             
             <hr className="mt-6 mb-1.5 border" />

             <div className="flex justify-center">
              <button className="flex gap-10 items-center justify-center bg-gray-100 w-full text-gray-500 text-lg font-semibold p-2.5 rounded-lg mt-5">
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