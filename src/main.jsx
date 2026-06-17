import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { VehicleProvider } from './context/VehicleContext.jsx'
import { PreRegisterProvider } from './context/PreRegisterContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VehicleProvider>
      <PreRegisterProvider>
        <App />
      </PreRegisterProvider>
    </VehicleProvider>
  </StrictMode>,
)