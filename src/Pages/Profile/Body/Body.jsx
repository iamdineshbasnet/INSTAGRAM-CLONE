import React, { useContext } from "react";
import "./style.css";
import { AuthContext } from "../../../ContextHook/AuthContext";
const Body = () => {
    // Accessing the currentUser value from the AuthContext
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            <div className="profile_body">
                <div className="profile_container">
                    <section className="profile_body_left">
                        <div className="profile_box">
                            <img src={currentUser.photoURL} alt="" />
                        </div>
                        <span>{currentUser.displayName}</span>
                    </section>
                    <div className="profile_follow">
                        <div className="profile_info">
                            <h1>Posts</h1>
                            <span>25</span>
                        </div>
                        <div className="profile_info">
                            <h1>Following</h1>
                            <span>25</span>
                        </div>
                        <div className="profile_info">
                            <h1>Followers</h1>
                            <span>25</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;
