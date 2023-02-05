import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../../ContextHook/AuthContext";
import Skeleton from "./skeleton/Skeleton";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
const Posts = (props) => {
    const [commentText, setCommentText] = useState("")
    const { currentUser } = useContext(AuthContext);
    // Destructure the props object to get the posts and setPosts function.
    const { posts, setPosts, loadPost } = props;

    // Function to handle likes on the post.
    const handleLikes = (index) => {
        // copy the existing posts array to update it.
        const updateLike = [...posts];

        // check if the post is already liked.
        if (updateLike[index].post.liked) {
            // If the post is already liked, decrement the like count.
            updateLike[index].post.likes_count =
                updateLike[index].post.likes_count - 1;
        } else {
            // If the post is not liked, increment the like count.
            updateLike[index].post.likes_count =
                updateLike[index].post.likes_count + 1;
        }

        // Toggle the liked status of the post.
        updateLike[index].post.liked = !updateLike[index].post.liked;

        // Update the state with the updated posts array
        setPosts(updateLike);

        // Update the like count and liked status of the post in the database
        const updateLikeCount = doc(db, "posts", `${updateLike[index].id}`);
        updateDoc(updateLikeCount, {
            likes_count: updateLike[index].post.likes_count,
            liked: updateLike[index].post.liked,
        });
    };
    // useEffect(()=>{
    //     handleLikes()
    // }, [posts])
    const handleCommentText = ({target: {value}})=>{
        setCommentText(value)
    }

    const handleCommentSubmmit = () => {
        console.log(commentText)
        setCommentText("")
    };

    // Function to handle actions on the post, when clicked on add post
    const handleAction = (e) => {
        // Get the post action container element.
        const postAction = document.querySelector("#post_action_container");
        // Toggle the active class on the post action container.
        postAction.classList.toggle("active");
    };
    return (
        <>
            {posts.map((postItem, index) => {
                return (
                    <>
                        {loadPost ? (
                            <Skeleton />
                        ) : (
                            <div className="post" key={index}>
                                <div className="post_container">
                                    <div className="post_top">
                                        <div className="post_author">
                                            <Avatar
                                                className="author_avatar"
                                                alt={postItem.post.username}
                                                src={postItem.post.avatar_url}
                                            />
                                            <span className="post_username">
                                                {postItem.post.username}
                                            </span>
                                        </div>
                                        <div className="post_top_action">
                                            <MoreVertIcon
                                                onClick={handleAction}
                                            />
                                            <div
                                                className="post_action_container"
                                                id="post_action_container">
                                                <div className="action_list_header">
                                                    <ShareOutlinedIcon className="list_header_action" />
                                                    <InsertLinkOutlinedIcon className="list_header_action" />
                                                    <BookmarkBorderOutlinedIcon className="list_header_action" />
                                                    <QrCodeScannerOutlinedIcon className="list_header_action" />
                                                </div>
                                                <ul className="action_list_body">
                                                    <li className="action_list_item">
                                                        <VisibilityOffIcon />
                                                        <span className="action_name">
                                                            Hide
                                                        </span>
                                                    </li>
                                                    <li className="action_list_item dangerous">
                                                        <AnnouncementOutlinedIcon />
                                                        <span className="action_name">
                                                            Report
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post_images">
                                        <img
                                            src={postItem.post.image_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="post_actions">
                                        <div className="post_actions_left">
                                            {postItem.post.liked ? (
                                                <FavoriteIcon
                                                    onClick={() =>
                                                        handleLikes(index)
                                                    }
                                                    className="post_action_icon post_like"
                                                />
                                            ) : (
                                                <FavoriteBorderOutlinedIcon
                                                    className=" post_action_icon post_unlike"
                                                    onClick={() =>
                                                        handleLikes(index)
                                                    }
                                                />
                                            )}
                                            <MapsUgcOutlinedIcon className="post_action_icon" />
                                            <SendOutlinedIcon className="post_action_icon" />
                                        </div>
                                        <div className="post_actions_right">
                                            <BookmarkBorderOutlinedIcon className="post_action_icon" />
                                        </div>
                                    </div>
                                    <div className="post_likes_count">
                                        <span>
                                            {postItem.post.likes_count} likes
                                        </span>
                                    </div>
                                    <div className="post_captions">
                                        <span className="captions_text">
                                            <strong>
                                                {postItem.post.username}
                                            </strong>
                                            {postItem.post.caption}
                                        </span>
                                    </div>
                                    <div className="display_post_comments">
                                        <div className="comment_author_img_box">
                                            <img
                                                src={currentUser.photoURL}
                                                alt=""
                                            />
                                        </div>
                                        <span>{currentUser.displayName}</span>
                                        <p>hello</p>
                                    </div>
                                    <div className="post_comments">
                                        <div className="post_comments_wrapper">
                                            <EmojiEmotionsOutlinedIcon
                                                sx={{
                                                    color: "gray",
                                                    cursor: "pointer",
                                                }}
                                            />
                                            <input
                                                onChange={handleCommentText}
                                                value={commentText}
                                                type="text"
                                                placeholder="comment..."
                                            />
                                            <SendOutlinedIcon
                                                onClick={handleCommentSubmmit}
                                                sx={{
                                                    color: "gray",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                );
            })}
        </>
    );
};

export default Posts;
