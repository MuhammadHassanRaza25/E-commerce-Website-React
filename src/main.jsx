import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './context/AuthContext.jsx'
import CartContextProvider from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContextProvider>
    <AuthContextProvider>
       <App />
    </AuthContextProvider>
    </CartContextProvider>
  </StrictMode>,
)
