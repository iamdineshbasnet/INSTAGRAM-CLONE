import React from "react";
import Navigation from "../../Global Components/Navigation/Navigation";
import Messages from "./Components/Body/Messages";
import Header from "./Components/Header/Index";
const Message = () => {
    return (
        <>
            <Header />
            <Messages/>
            <Navigation />
        </>
    );
};

export default Message;
