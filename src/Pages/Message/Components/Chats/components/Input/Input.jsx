import React, { useState } from "react";
import "./style.css";
import SendIcon from "@mui/icons-material/Send";
const Input = () => {
    const [message, setMessage] = useState("")

    const handleMsgText = ({target: {value}}) =>{
        setMessage(value)
        const sendMsgBtn = document.querySelector("#sendMsg")
        if(message.trim().length > 0){
            sendMsgBtn.classList.remove('active')
        }else{
            sendMsgBtn.classList.add('active')
        }
    }
    const handleSubmitMsg =(e)=>{
        e.preventDefault()
    }
    return (
        <div className="chats_input">
            <div className="chats_input_container">
                <div className="chats_input_field">
                    <input type="text" onChange={handleMsgText} value={message}/>
                </div>
                <div className="send_chats active" id="sendMsg" onClick={handleSubmitMsg}>
                    <SendIcon className="sendIcon" />
                </div>
            </div>
        </div>
    );
};

export default Input;
