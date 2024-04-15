import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Projects from "./pages/Projects";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/*we are making the dashboard private so that the people who are signed in can only access it*/}
        <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
