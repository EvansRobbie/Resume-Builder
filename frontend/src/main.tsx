import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import ResumeContextProvider from './context/ResumeContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ResumeContextProvider>
      <Router>
        <App />
      </Router>
    </ResumeContextProvider>
  </React.StrictMode>,
)
