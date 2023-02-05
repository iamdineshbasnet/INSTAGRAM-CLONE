import React from "react";
import "./style.css";
import GraphicEqOutlinedIcon from "@mui/icons-material/GraphicEqOutlined";
const Footer = ({video_title, videoAuthor_img, isVideoPlaying}) => {
    return (
        <>
            <div className="reels_footer">
                <div className="footer_container">
                    <section className="footer_left">
                        <GraphicEqOutlinedIcon className="music_logo" />
                        <marquee>{video_title}</marquee>
                    </section>
                    <section className="footer_right">
                        <div className={`music_author ${isVideoPlaying? 'active': ''}`}>
                            <img src={videoAuthor_img} alt="" />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Footer;
