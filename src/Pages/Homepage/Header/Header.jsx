import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
const Header = () => {
    const navigate = useNavigate();

    // Function to handle navigation to a specific path
    const handleNavigation = (path) => {
        // call the useNavigate hook and pass the desired path to navigate to
        navigate(`${path}`);
    };


    return (
        <>
            <header className="home_header">
                <div className="home_header_container">
                    <div className="home_header_logo">
                        <span
                            className="home_header_logo_text"
                            onClick={() => handleNavigation("/")}>
                            Instagram
                        </span>
                    </div>
                    
                    <div className="home_header_actions">
                        <ExitToAppOutlinedIcon
                            className="logout"
                            onClick={() => signOut(auth)}
                        />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
