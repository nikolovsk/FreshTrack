import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import "./styles/variables.css";
import "./styles/auth.css";
import "./styles/layout.css";
import "./styles/home.css";
import "./styles/groceries.css";
import "./styles/toast.css"
import { ToastProvider } from "./context/toast/ToastProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <AuthProvider>
              <ToastProvider>
                  <App />
              </ToastProvider>
          </AuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
