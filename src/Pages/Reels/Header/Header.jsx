import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
const Header = ({ isVideoPlaying }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/");
    };
    return (
        <>
            <div className="reels_header">
                <div className="reels_header_container">
                    <div className="reels_header_content">
                        <section className="header_left">
                            <ArrowBackIosIcon
                                className="reels_back_icon"
                                onClick={handleNavigation}
                            />
                            <span>Reels</span>
                        </section>
                        <section className="header_right">
                            {isVideoPlaying ? (
                                <PauseOutlinedIcon />
                            ) : (
                                <PlayArrowIcon />
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
