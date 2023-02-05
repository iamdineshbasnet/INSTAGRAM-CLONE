import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const Header = () => {
    const navigate = useNavigate()
    const handleBackToMsg = () =>{
        navigate('/message')
    }
    return (
        <div className="chats_header">
            <div className="chats_header_container">
                <section className="chats_header_left">
                    <div className="chats_header_icon">
                        <ArrowBackIosIcon
                        fontSize="medium"
                        onClick={handleBackToMsg}
                        className="chats_header_back_icon" />
                    </div>
                    <div className="chats_user">
                        <img
                            src="https://imgs.search.brave.com/75wgpo9W5u-dGOcAWU9vQSlqdNKVvDOCuY-kOoaRXgU/rs:fit:1000:1000:1/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8zLmpwZw"
                            alt=""
                        />
                        <span>alexa</span>
                    </div>
                </section>
                <section className="chats_header_right">
                    <VideocamIcon className="chats_header_right_icon" />
                    <MicIcon className="chats_header_right_icon" />
                    <InfoOutlinedIcon className="chats_header_right_icon" />
                </section>
            </div>
        </div>
    );
};

export default Header;
