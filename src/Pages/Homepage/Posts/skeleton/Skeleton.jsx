import React from "react";
import './style.css'
const Skeleton = () => {
    return (
        <>
            <div className="post_skeleton">
                <div className="post_skeleton_container">
                    <div className="avatar_skeleton"></div>
                    <div className="post_img_skeleton"></div>
                    <div className="post_caption_skeleton_1"></div>
                    <div className="post_caption_skeleton_2"></div>
                    <div className="post_comment_skeleton"></div>
                </div>
                <div className="post_skeleton_container">
                    <div className="avatar_skeleton"></div>
                    <div className="post_img_skeleton"></div>
                    <div className="post_caption_skeleton_1"></div>
                    <div className="post_caption_skeleton_2"></div>
                    <div className="post_comment_skeleton"></div>
                </div>
                
            </div>
        </>
    );
};

export default Skeleton;
