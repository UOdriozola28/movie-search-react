import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geologica';
import './index.css'
import App from './App.jsx'
import Counter from './Counter.jsx'

createRoot(document.getElementById('root')).render(
  <App />
  // <Counter />
)
