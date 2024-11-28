import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Register";

import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import { useState } from "react";
import { auth } from "./components/Firebase";
import { ToastContainer } from "react-toastify"
import Sidebar from "./components/Sidebar";
import AddNote from "./components/AddNote";
import MyNote from "./components/MyNote";
import Footer from "./components/Footer";

function App() {
  const [isLogin,setIsLogin] = useState(false);
  const [userState, setUserState] = useState(null);
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserState(user);
    });
  },[]);
  return (
    <Router>
      <>
      <div className="App">
      {!isLogin && userState ?<>
        <Sidebar onIsLogin = {setIsLogin}>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route
                  path="/"
                  element={userState ? <Navigate to="/profile" /> : <Login />}
                />
                <Route
                  path="/login"
                  element={<Navigate to="/profile" />}
                />
                <Route
                  path="/register"
                  element={<Navigate to="/profile" />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addnote" element={<AddNote  />} />
                <Route path="/allnote" element={<MyNote />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
          </Sidebar>
          <Footer/>
      </> 
      :  <div className="auth-wrapper">
      <div className="auth-inner">
        <Routes>
          <Route
            path="/"
            element={userState ? <Navigate to="/profile" /> : <Login />}
          />
          <Route path="/login" element={<Login onIsLogin = {setIsLogin} />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
      }
       
      </div>
      </>
    </Router>
  );
}

export default App;