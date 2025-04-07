import './styles/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import GlobalKeyListener from './components/GlobalKeyListener'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <GlobalKeyListener />
  </React.StrictMode>
)
