import React, { useContext, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../ContextHook/AuthContext";
import { db } from "../../../../firebase";
import {
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const Index = () => {
    // Get currentUser information from the AuthContext
    const { currentUser } = useContext(AuthContext);

    // set the state of the search bar's value
    const [username, setUsername] = useState("");

    // set the state of the  selected user
    const [user, setUser] = useState(null);

    // set the state of the error state, if any
    const [err, setErr] = useState(false);

    // use the useNavigate hook to navigate to the other page
    const navigate = useNavigate();

    // search the user based on the displayName from the firebase database
    const handleSearch = async () => {
        // Create a firestore query to search for the user with the displayName that matches the search bar's value
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            // Get the query result
            const querySnapshot = await getDocs(q);

            // For each result, set the selected user's information in the state
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            // If an error occurs, set the error state
            setErr(true);
        }
    };

    // Search for the user when the enter key is pressed in the search bar
    const handleSearchKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    // Handle navigation function to redirect the user to the homepage
    const handleNavigation = () => {
        navigate("/");
    };
    return (
        <>
            <div className="message_header">
                <div className="msg_header_container">
                    <div className="msg_header_logo">
                        <h1 onClick={handleNavigation}>Instagram</h1>
                    </div>
                    <div className="search_user">
                        <div className="search_user_box">
                            <SearchOutlinedIcon className="user_search_icon" />
                            <input
                                onKeyDown={handleSearchKey}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                type="text"
                                placeholder="Find a user"
                            />
                        </div>
                        {user && (
                            <ul className="search_user_list">
                                <li className="user_list">
                                    <div className="user_img_box">
                                        <img src={user.photoURL} alt="" />
                                    </div>
                                    <span>{user.displayName}</span>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="msg_header_user">
                        <div className="msg_header_profile_box">
                            <img src={currentUser.photoURL} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
