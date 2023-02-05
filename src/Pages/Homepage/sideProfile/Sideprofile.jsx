import React, { useContext } from "react";
import "./style.css";
import { AuthContext } from "../../../ContextHook/AuthContext";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
const Sideprofile = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            <div className="side_profile">
                <div className="side_profile_container">
                    <div className="side_profile_box">
                        <div className="side_profile_img_box">
                            <img src={currentUser.photoURL} alt="" />
                        </div>
                        <div className="side_profile_content_box">
                            <span>{currentUser.displayName}</span>
                            <div className="switch_account">
                                <span>switch account</span>
                                <AutorenewOutlinedIcon />
                            </div>
                        </div>
                    </div>

                    <div className="user_profile_suggestion">
                        <div className="profile_suggestion_header">
                            <span>Suggestion</span>
                        </div>
                        <div className="suggestion_content">
                            <div className="suggestion_content_box">
                                <div className="suggestion_user_img_box">
                                    <img src={currentUser.photoURL} alt="" />
                                </div>
                                <span>{currentUser.displayName}</span>
                                <button>follow</button>
                            </div>
                            <div className="suggestion_content_box">
                                <div className="suggestion_user_img_box">
                                    <img src={currentUser.photoURL} alt="" />
                                </div>
                                <span>{currentUser.displayName}</span>
                                <button>follow</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sideprofile;
