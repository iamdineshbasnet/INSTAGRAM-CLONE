import React, { useContext, useRef, useState } from "react";
import "./style.css";
import { AuthContext } from "../../../ContextHook/AuthContext";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import {
    collection,
    doc,
    getDocs,
    query,
    addDoc,
    updateDoc,
    where,
    deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Sideprofile = () => {
    const navigate = useNavigate()
    const [follow, setFollow] = useState({});
    const { currentUser, userInfo, setUserInfo, currentUserList } =
        useContext(AuthContext);

    const handleFollowBtn = async (index) => {
        const updateFollow = [...userInfo];
        const followersCount = doc(db, `users`, `${updateFollow[index].id}`);
        const followingCount = doc(db, `users`, `${currentUserList.id}`);
        const userRef = collection(
            db,
            `users/${updateFollow[index].id}/followers`
        );
        const q = query(
            userRef,
            where("username", "==", `${currentUser.displayName}`)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            addDoc(
                collection(db, `users/${updateFollow[index].id}/followers`),
                {
                    username: currentUser.displayName,
                    followers_status: true,
                }
            ).then(() => {
                setFollow({ ...follow, [index]: true });
            });
            addDoc(collection(db, `users/${currentUserList.id}/following`),{
                username: updateFollow[index].listUsers.displayName
            })
            updateFollow[index].listUsers.followers =
                updateFollow[index].listUsers.followers + 1;
            currentUserList.user.following = currentUserList.user.following + 1;
        } else {
            querySnapshot.forEach((snapshot) => {
                deleteDoc(doc(db, `users/${currentUserList.id}/following`, `${snapshot.id}`))
                deleteDoc(
                    doc(
                        db,
                        `users/${updateFollow[index].id}/followers`,
                        `${snapshot.id}`
                    )
                ).then(() => {
                    setFollow({ ...follow, [index]: false });
                });
                updateFollow[index].listUsers.followers =
                    updateFollow[index].listUsers.followers - 1;
                currentUserList.user.following =
                    currentUserList.user.following - 1;
            });
        }
        updateDoc(followersCount, {
            followers: updateFollow[index].listUsers.followers,
        });
        updateDoc(followingCount, {
            following: currentUserList.user.following,
        });
        setUserInfo(updateFollow);
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
                            <span onClick={()=>navigate('/profile')}>{currentUser.displayName}</span>
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
                            <span>Suggestions for you</span>
                        </div>
                        {userInfo.map((userItem, index) => {
                            return (
                                <div className="suggestion_content" key={index}>
                                    <div className="suggestion_content_box">
                                        <div className="suggestion_user_img_box">
                                            <img
                                                src={
                                                    userItem.listUsers.photoURL
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <span>
                                            {userItem.listUsers.displayName}
                                        </span>

                                        <button
                                            className={`follow_btn ${
                                                follow[index] ? "active" : ""
                                            }`}
                                            onClick={() =>
                                                handleFollowBtn(index)
                                            }>
                                            {follow[index]
                                                ? "unfollow"
                                                : "follow"}
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
