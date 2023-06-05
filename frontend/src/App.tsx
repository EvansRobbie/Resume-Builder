import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import axios from "axios";
import ViewResume from "./pages/ViewResume";
import LoginModal from "./components/LoginModal";
import GenerateResume from "./pages/GenerateResume";
import ProtectedRoute from "./components/ProtectedRoute";
axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true;
// console.log(axios.defaults.baseURL)
function App() {
  const [showModal, setShowModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleLoginModal = () => {
    setLoginModal(!loginModal);
  };

  return (
    <>
      <Navbar handleModal={handleModal} handleLoginModal={handleLoginModal} />
      {showModal && <ProtectedRoute>  <ViewResume handleModal={handleModal} /></ProtectedRoute>}
      {loginModal && (
        <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      )}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/create-resume/:subpages/:action" element={ <Home />} />
        <Route path="/create-resume/:subpages?" element={<ProtectedRoute> <Home /></ProtectedRoute>} />
        <Route path="/generate-resume" element={ <GenerateResume />} />
      </Routes>
    </>
  );
}

export default App;
