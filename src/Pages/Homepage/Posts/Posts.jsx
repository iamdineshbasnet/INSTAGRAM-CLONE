import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.css";
import { db } from "../../../firebase";
import {
    doc,
    updateDoc,
    collection,
    addDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
const Posts = (props) => {
    const [isUserLiked, setIsUserLiked] = useState({});
    const [commentText, setCommentText] = useState({});
    const [commentInput, setCommentInput] = useState({})
    const { currentUser } = useContext(AuthContext);
    // Destructure the props object to get the posts and setPosts function.
    const { posts, setPosts, loadPost, setPageActive } = props;

    // Function to handle likes on the post.
    const handleLikes = async (index) => {
        // copy the existing posts array to update it.
        const updateLike = [...posts];
        // check if the post is already liked.
        if (isUserLiked[index]) {
            updateLike[index].post.likes_count =
                updateLike[index].post.likes_count - 1;
            setIsUserLiked({ ...isUserLiked, [index]: false });
        } else {
            updateLike[index].post.likes_count =
                updateLike[index].post.likes_count + 1;
            setIsUserLiked({ ...isUserLiked, [index]: true });
        }
        setPosts(updateLike);
        // Update the like count and liked status of the post in the database
        const updateLikeCount = doc(db, "posts", `${updateLike[index].id}`);
        updateDoc(updateLikeCount, {
            likes_count: updateLike[index].post.likes_count,
        });
    };
    const handleCommentText = (value, index) => {
        setCommentText({...commentInput, [index]: value})

    };

    const handleCommentSubmmit = async (index) => {
        const updatePosts = [...posts];
        await addDoc(
            collection(db, `posts/${updatePosts[index].id}/comments`),
            {
                username: currentUser.displayName,
                avatar_url: currentUser.photoURL,
                comment: commentText[index],
                commentAt: serverTimestamp(),
            }
        );
        const updateCommentsCount = doc(
            db,
            "posts",
            `${updatePosts[index].id}`
        );
        updateDoc(updateCommentsCount, {
            comments_count: updatePosts[index].post.comments_count + 1,
        });
        setCommentText("");
        setPosts(updatePosts);
    };
    const handleComment = (index) => {
        const commentTextField = document.querySelectorAll(".commentTextField")
        commentTextField[index].focus()
    };
    const postAction = document.querySelectorAll(".post_action_container");
    const handleDeletePost = async (id, index) => {
        postAction[index].classList.remove('active')
        await deleteDoc(doc(db, "posts", id));
    };
    // Function to handle actions on the post, when clicked on add post
    const handleAction = (index) => {
        // Get the post action container element.
        // Toggle the active class on the post action container.
        if (postAction[index].classList.contains("active")) {
            postAction[index].classList.remove("active");
            setPageActive(false);
        } else {
            postAction[index].classList.add("active");
            setPageActive(true);
        }
    };

    return (
        <>
            {posts?.map((postItem, index) => {
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
                                                sx={{ pointerEvents: "all" }}
                                                onClick={() =>
                                                    handleAction(index)
                                                }
                                            />
                                        </div>

                                        <div className="post_action_container">
                                            <div className="action_list_header">
                                                <ShareOutlinedIcon className="list_header_action" />
                                                <InsertLinkOutlinedIcon className="list_header_action" />
                                                <BookmarkBorderOutlinedIcon className="list_header_action" />
                                                <QrCodeScannerOutlinedIcon className="list_header_action" />
                                            </div>
                                            <ul className="action_list_body">
                                                {currentUser.displayName ===
                                                postItem.post.username ? (
                                                    <li
                                                        className="action_list_item"
                                                        onClick={() =>
                                                            handleDeletePost(
                                                                postItem.id, index
                                                            )
                                                        }>
                                                        <DeleteOutlinedIcon />
                                                        <span className="action_name">
                                                            Delete
                                                        </span>
                                                    </li>
                                                ) : (
                                                    <li className="action_list_item">
                                                        <VisibilityOffIcon />
                                                        <span className="action_name">
                                                            Hide
                                                        </span>
                                                    </li>
                                                )}
                                                <li className="action_list_item dangerous">
                                                    <AnnouncementOutlinedIcon />
                                                    <span className="action_name">
                                                        Report
                                                    </span>
                                                </li>
                                            </ul>
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
                                            {isUserLiked[index] ? (
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
                                            <MapsUgcOutlinedIcon
                                                className="post_action_icon"
                                                onClick={() =>
                                                    handleComment(index)
                                                }
                                            />
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

                                    {postItem?.comments.map(
                                        (commentItem, i) => {
                                            return (
                                                <div
                                                    className="display_post_comments"
                                                    key={i}>
                                                    <div className="comment_author_img_box">
                                                        <img
                                                            src={
                                                                commentItem.avatar_url
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <span>
                                                        {commentItem.username}
                                                    </span>
                                                    <p>{commentItem.comment}</p>
                                                </div>
                                            );
                                        }
                                    )}

                                    <div className="post_comments">
                                        <div className="post_comments_wrapper">
                                            <EmojiEmotionsOutlinedIcon
                                                sx={{
                                                    color: "gray",
                                                    cursor: "pointer",
                                                }}
                                            />
                                            <input
                                                className="commentTextField"
                                                onChange={(e)=>handleCommentText(e.target.value, index)}
                                                value={commentText[index]}
                                                type="text"
                                                placeholder="comment..."
                                            />
                                            <SendOutlinedIcon
                                                onClick={() =>
                                                    handleCommentSubmmit(index)
                                                }
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
