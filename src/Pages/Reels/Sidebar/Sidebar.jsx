import React from "react";
import "./style.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
const Sidebar = ({ likes_count, comments_count, share_count }) => {
    console.log("i am ruuning")
    return (
        <>
            <div className="reels_sidebar">
                <div className="reels_sidebar_container">
                    <div className="reels_sidebar_action">
                        <FavoriteBorderOutlinedIcon className="sidebar_icon" />
                        <span>{likes_count}</span>
                    </div>
                    <div className="reels_sidebar_action">
                        <MapsUgcOutlinedIcon className="sidebar_icon" />
                        <span>{comments_count}</span>
                    </div>
                    <div className="reels_sidebar_action">
                        <ShareOutlinedIcon className="sidebar_icon" />
                        <span>{share_count}</span>
                    </div>
                    <div className="reels_sidebar_action">
                        <MoreVertOutlinedIcon className="sidebar_icon" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
