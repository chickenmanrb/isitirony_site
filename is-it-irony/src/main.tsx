import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'  // <— compiled output from the CLI
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
