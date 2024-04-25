import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import AddMovie from "./pages/addMovie/AddMovie";
import UpdateMovie from "./components/updateMovie/UpdateMovie";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/addMovie" element={<AddMovie/>} />
        <Route path="/" element={<Home/>}></Route>
        <Route path="/updateMovie" element={<UpdateMovie/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;