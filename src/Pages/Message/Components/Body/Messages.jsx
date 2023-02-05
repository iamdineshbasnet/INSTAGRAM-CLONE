import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
const Messages = () => {
    const navigate = useNavigate();
    const handleChats = () => {
        navigate("/chats");
    };
    return (
        <div className="Message_body">
            <div className="msg_body_container" onClick={handleChats}>
                <div className="msg_box">
                    <div className="msg_img_box">
                        <img
                            src="https://imgs.search.brave.com/75wgpo9W5u-dGOcAWU9vQSlqdNKVvDOCuY-kOoaRXgU/rs:fit:1000:1000:1/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8zLmpwZw"
                            alt=""
                        />
                    </div>
                    <div className="msg_text">
                        <span>alexa</span>
                        <p>message</p>
                    </div>
                </div>
                <div className="msg_box">
                    <div className="msg_img_box">
                        <img
                            src="https://imgs.search.brave.com/75wgpo9W5u-dGOcAWU9vQSlqdNKVvDOCuY-kOoaRXgU/rs:fit:1000:1000:1/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8zLmpwZw"
                            alt=""
                        />
                    </div>
                    <div className="msg_text">
                        <span>alexa</span>
                        <p>message</p>
                    </div>
                </div>
                <div className="msg_box">
                    <div className="msg_img_box">
                        <img
                            src="https://imgs.search.brave.com/75wgpo9W5u-dGOcAWU9vQSlqdNKVvDOCuY-kOoaRXgU/rs:fit:1000:1000:1/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8zLmpwZw"
                            alt=""
                        />
                    </div>
                    <div className="msg_text">
                        <span>alexa</span>
                        <p>message</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
