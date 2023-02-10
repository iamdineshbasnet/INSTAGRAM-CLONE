import React, { useContext, useRef, useState } from "react";
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
    const [liked, setLiked] = useState(false);
    const [focusedField, setFocusField] = useState(-1)
    const [commentText, setCommentText] = useState({});
    const commentRef = useRef(null);
    const { currentUser } = useContext(AuthContext);
    // Destructure the props object to get the posts and setPosts function.
    const { posts, setPosts, loadPost, setPageActive } = props;
    // Function to handle likes on the post.
    // const handleLikes = async (index) => {
    //     // copy the existing posts array to update it.
    //     const updateLike = [...posts];

    //     // check if the post is already liked.
    //     if (liked) {
    //         // If the post is already liked, decrement the like count.
    //         updateLike[index].post.likes_count =
    //             updateLike[index].post.likes_count - 1;
    //         setLiked(false);
    //     } else {
    //         // If the post is not liked, increment the like count.
    //         updateLike[index].post.likes_count =
    //             updateLike[index].post.likes_count + 1;
    //         setLiked(true);
    //     }

    //     // Toggle the liked status of the post.
    //     // updateLike[index].post.liked = !updateLike[index].post.liked;

    //     // Update the state with the updated posts array
    //     setPosts(updateLike);

    //     const q = query(
    //         collection(db, `posts/${posts[index].id}/likes`),
    //         where("liked_by", "==", currentUser.displayName)
    //     );
    //     const querySnapshot = await getDocs(q);
    //     if (querySnapshot.empty) {
    //         await collection(db, `posts/${posts[index].id}/likes`).add({
    //             liked_by: currentUser.displayName,
    //             liked_status: true,
    //         });
    //     } else {
    //         querySnapshot.forEach(async (doc) => {
    //             await doc.ref.update({
    //                 liked_status: !liked,
    //             });
    //         });
    //     }

    //     // Update the like count and liked status of the post in the database
    //     const updateLikeCount = doc(db, "posts", `${updateLike[index].id}`);
    //     updateDoc(updateLikeCount, {
    //         likes_count: updateLike[index].post.likes_count,
    //     });
    // };
    const handleCommentText = (value, index) => {
        setCommentText({...commentText, [index]: value});
    };

    const handleCommentSubmmit = async (index) => {
        const updateComments = [...posts];
        await addDoc(
            collection(db, `posts/${updateComments[index].id}/comments`),
            {
                username: currentUser.displayName,
                avatar_url: currentUser.photoURL,
                comment: commentText,
                commentAt: serverTimestamp(),
            }
        );
        setPosts(updateComments);
        const updateCommentsCount = doc(
            db,
            "posts",
            `${updateComments[index].id}`
        );
        updateDoc(updateCommentsCount, {
            comments_count: updateComments[index].post.comments_count + 1,
        });
        setCommentText("");
    };
    const handleComment = (index) => {
        setFocusField(index)
        console.log(focusedField)
    };
    const handleDeletePost = async (id) => {
        await deleteDoc(doc(db, "posts", id));
    };
    // Function to handle actions on the post, when clicked on add post
    const handleAction = (e) => {
        // Get the post action container element.
        const postAction = document.querySelector("#post_action_container");
        // Toggle the active class on the post action container.
        if (postAction.classList.contains("active")) {
            postAction.classList.remove("active");
            setPageActive(false);
        } else {
            postAction.classList.add("active");
            setPageActive(true);
        }
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
                                                sx={{ pointerEvents: "all" }}
                                                onClick={handleAction}
                                            />
                                        </div>

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
                                                {currentUser.displayName ===
                                                postItem.post.username ? (
                                                    <li className="action_list_item">
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
                                            {postItem.post.liked ? (
                                                <FavoriteIcon
                                                    // onClick={() =>
                                                    //     handleLikes(index)
                                                    // }
                                                    className="post_action_icon post_like"
                                                />
                                            ) : (
                                                <FavoriteBorderOutlinedIcon
                                                    className=" post_action_icon post_unlike"
                                                    // onClick={() =>
                                                    //     handleLikes(index)
                                                    // }
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
                                    {postItem.comments.map((comment, index) => {
                                        return (
                                            <div
                                                className="display_post_comments"
                                                key={index}>
                                                <div className="comment_author_img_box">
                                                    <img
                                                        src={comment.avatar_url}
                                                        alt=""
                                                    />
                                                </div>
                                                <span>{comment.username}</span>
                                                <p>{comment.comment}</p>
                                            </div>
                                        );
                                    })}

                                    <div className="post_comments">
                                        <div className="post_comments_wrapper">
                                            <EmojiEmotionsOutlinedIcon
                                                sx={{
                                                    color: "gray",
                                                    cursor: "pointer",
                                                }}
                                            />
                                            <input
                                                ref={(input)=> input && focusedField === index && input.focus()}
                                                onChange={(e)=>handleCommentText(e.target.value, index)}
                                                value={commentText[index] || ""}
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
