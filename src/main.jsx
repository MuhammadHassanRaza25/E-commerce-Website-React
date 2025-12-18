import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './context/AuthContext.jsx'
import CartContextProvider from './context/CartContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <CartContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CartContextProvider>
    </AdminProvider>
  </StrictMode>,
)
