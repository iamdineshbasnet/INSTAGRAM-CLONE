import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Reels from "./Pages/Reels/Reels";
import Message from "./Pages/Message/Message";
import Profile from "./Pages/Profile/Profile";
import Login from "./Form/Login/Login";
import Signup from "./Form/Signup/Signup";
import {useContext} from 'react'
import { AuthContext } from "./ContextHook/AuthContext";
import Chats from "./Pages/Message/Components/Chats/Chats";
function App() {
    const {currentUser} = useContext(AuthContext)
    // Initialize the Navigation state
    const [isNavActive, setIsNavActive ] = useState(false)
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/" element={currentUser?<Homepage isNavActive={isNavActive} setIsNavActive={setIsNavActive}/>:<Login/>} />
                    <Route exact path="/reels" element={<Reels />} />
                    <Route exact path="/message" element={<Message />} />
                    <Route exact path="/chats" element={<Chats />} />
                    <Route exact path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
