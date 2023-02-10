import "./style.css";
import React, { useContext, useRef, useState } from "react";
import { db, storage, auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, addDoc, serverTimestamp, collection } from "firebase/firestore";
import { AuthContext } from "../../ContextHook/AuthContext";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import MovieIcon from "@mui/icons-material/Movie";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddCircle from "@mui/icons-material/AddCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
const Navigation = ({ collectionRef, posts, setPosts }) => {
    // "useRef" hook to access DOM Element
    const appNavigation = useRef();
    // Importing currentUser from "AuthContext"
    const { currentUser, listAllUser } = useContext(AuthContext);
    // console.log(listAllUser[0].listUsers.posts_count)

    // "useNavigate" hooks to redirect to different pages
    const navigate = useNavigate();

    // Setting the initial state for the image, progress, caption, and addPostActive
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");
    const [addPostActive, setAddPostActive] = useState(false);

    // Keeping the track of the current active page
    const [activeItem, setActiveItem] = useState(window.location.pathname);

    // Function for handling Navigation between pages
    const handleNavigation = (path) => {
        navigate(path);
        setActiveItem(path);
    };

    // Referencing the post upload container DOM element
    const uploadContainer = document.querySelector("#post_upload_container");

    // Function for handling the post cancel event
    const handlePostCancel = () => {
        // Removing the active class from the upload container
        uploadContainer.classList.remove("active");

        // Resetting the state values for image, progress, caption and addPostActive
        setAddPostActive(false);
        setImage(null);
        setProgress(0);
        setCaption("");
    };

    // Function for handling the post upload event
    const handlePostUpload = () => {
        if (uploadContainer.classList.contains("active")) {
            // Removing the active class from the upload container
            uploadContainer.classList.remove("active");
            // Setting addPostActive to false
            setAddPostActive(false);
        } else {
            // Adding the active class to the upload container
            uploadContainer.classList.add("active");

            // setting addPostActive to true
            setAddPostActive(true);
        }
    };

    // Function for handling the file selection event
    const handleFile = (e) => {
        if (e.target.files[0]) {
            // Updating the state with the selected file
            setImage(e.target.files[0]);
        }
    };

    // Function for uploading the post
    const uploadPost = (e) => {
        // Preventing the default form submit behavior
        e.preventDefault();

        // checking if an image has been selected
        if (!image) {
            // Exiting the function if no image has been selected
            return;
        }

        // Referencing the firebase storage location for the image
        const storageRef = ref(storage, `images/${image.name}`);

        // Uploading the image file
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Listen for state changes during the upload process
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // calculating the upload progress
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // updating the progress state
                setProgress(progress);
            },
            (err) => console.log(err),
            () => {
                // Getting the URL for the uploaded image
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // Add the data for the post to the firestore collection
                    addDoc(collectionRef, {
                        caption: caption,
                        timestamp: serverTimestamp(),
                        likes_count: 0,
                        comments_count: 0,
                        image_url: url,
                        avatar_url: `${currentUser.photoURL}`,
                        username: `${currentUser.displayName}`,
                    });
                    addDoc(collection(db, `users/${currentUser.uid}/posts`),{
                        image_url: url
                    })
                    // Remove the active class form upload container
                    uploadContainer.classList.remove("active");

                    // Resetting the state values for image, caption, progress and addPostActive
                    setAddPostActive(false);
                    setImage(null);
                    setProgress(0);
                    setCaption("");
                });
            }
        );

        listAllUser.map( async(user)=>{
            if(user.listUsers.displayName === currentUser.displayName){
                const updatePostsCount = doc(db, 'users', `${currentUser.uid}`)
                
                updateDoc(updatePostsCount, {
                    posts_count: user.listUsers.posts_count + 1
                })
            }
        })
    };

    const handleSignout = () => {
        signOut(auth);
    };
    return (
        <>
            <nav className="app_navigation">
                <ul className="app_nav_items">
                    <li
                        className={`nav_item`}
                        onClick={() => handleNavigation("/")}>
                        {activeItem === "/" ? (
                            <HomeIcon />
                        ) : (
                            <HomeOutlinedIcon fontSize="medium" />
                        )}
                        <span className="nav_item_text">Home</span>
                    </li>
                    <li
                        className={`nav_item`}
                        onClick={() => handleNavigation("/reels")}>
                        {activeItem === "/reels" ? (
                            <MovieIcon />
                        ) : (
                            <MovieOutlinedIcon fontSize="medium" />
                        )}
                        <span className="nav_item_text">Reels</span>
                    </li>
                    <li className={`nav_item`} onClick={handlePostUpload}>
                        {addPostActive ? (
                            <AddCircle />
                        ) : (
                            <AddCircleOutlineOutlinedIcon />
                        )}
                        <span className="nav_item_text">Create</span>
                    </li>
                    <form
                        onSubmit={uploadPost}
                        id="post_upload_container"
                        className="post_upload_container">
                        <div className="post_cancel_btn">
                            <CloseIcon onClick={handlePostCancel} />
                        </div>
                        <div className="caption_text_input">
                            <input
                                onChange={(event) =>
                                    setCaption(event.target.value)
                                }
                                value={caption}
                                type="text"
                                placeholder="What's on your mind?"
                                required
                            />
                        </div>
                        <div className="choose_file">
                            <AddReactionOutlinedIcon
                                titleAccess="emoji"
                                className="caption_icons"
                            />
                            <CalendarMonthOutlinedIcon
                                titleAccess="schedule"
                                className="caption_icons"
                            />
                            <input
                                onChange={handleFile}
                                required
                                type="file"
                                id="file"
                                style={{
                                    display: "none",
                                    cursor: "pointer",
                                    pointerEvents: "all",
                                }}
                            />
                            <label htmlFor="file">
                                <ImageOutlinedIcon
                                    titleAccess="choose image"
                                    className="caption_icons"
                                />
                            </label>
                        </div>
                        <div className="progress_bar">
                            <input
                                type="range"
                                name="progress"
                                value={progress}
                                readOnly
                            />
                        </div>
                        <div className="post_upload_btn">
                            <button type="submit">post</button>
                        </div>
                    </form>
                    <li
                        className={`nav_item`}
                        onClick={() => handleNavigation("/message")}>
                        {activeItem === "/message" ? (
                            <MarkChatUnreadIcon />
                        ) : (
                            <MarkChatUnreadOutlinedIcon fontSize="medium" />
                        )}
                        <span className="nav_item_text">Message</span>
                    </li>
                    <li
                        className={`nav_item`}
                        onClick={() => handleNavigation("/profile")}>
                        {activeItem === "/profile" ? (
                            <AccountCircleIcon />
                        ) : (
                            <AccountCircleOutlinedIcon fontSize="medium" />
                        )}
                        <span className="nav_item_text">Profile</span>
                    </li>
                    <li className="nav_item logout_btn" onClick={handleSignout}>
                        <ExitToAppOutlinedIcon />
                        <span className="nav_item_text">Logout</span>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navigation;
