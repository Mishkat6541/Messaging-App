import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CreateHomePage from './homepage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CreateHomePage>
      
    </CreateHomePage>
  </StrictMode>,
)
