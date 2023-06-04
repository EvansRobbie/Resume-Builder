import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import ResumeContextProvider from "./context/ResumeContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ResumeContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </ResumeContextProvider>
    </Router>
  </React.StrictMode>
);
