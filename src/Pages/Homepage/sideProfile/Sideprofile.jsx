import React, { useContext, useRef, useState } from "react";
import "./style.css";
import { AuthContext } from "../../../ContextHook/AuthContext";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
const Sideprofile = () => {
    const [follow, setFollow] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { listAllUser } = useContext(AuthContext);

    const followBtnRef = useRef();
    const handleFollowBtn = () => {
        if (followBtnRef.current.classList.contains("active")) {
            followBtnRef.current.classList.remove("active");
            setFollow(false);
        } else {
            followBtnRef.current.classList.add("active");
            setFollow(true);
        }
    };
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
                            <div
                                className="switch_account"
                                onClick={() => signOut(auth)}>
                                <span>switch account</span>
                                <AutorenewOutlinedIcon />
                            </div>
                        </div>
                    </div>

                    <div className="user_profile_suggestion">
                        <div className="profile_suggestion_header">
                            <span>Suggestion</span>
                        </div>
                        {listAllUser.map((userItem, index) => {
                            return (
                                
                                <div className="suggestion_content" key={index}>
                                    <div className="suggestion_content_box">
                                        <div className="suggestion_user_img_box">
                                            <img
                                                src={userItem.listUsers.photoURL}
                                                alt=""
                                            />
                                        </div>
                                        <span>{userItem.listUsers.displayName}</span>
                                        <button
                                            className="follow_btn"
                                            onClick={handleFollowBtn}
                                            ref={followBtnRef}>
                                            {follow ? "unfollow" : "follow"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sideprofile;
