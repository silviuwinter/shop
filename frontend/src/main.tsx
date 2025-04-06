// this is the entry point of the app, it sets up and renders everything
import { StrictMode } from 'react' // strict mode helps catch bugs in dev
import { createRoot } from 'react-dom/client' // for rendering the app
import './index.css' // styles for the app
import App from './App.tsx' // main app component

// this renders the app inside the 'root' div in the html
createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <App /> {/* loads the main app */}
  </StrictMode>,
)
