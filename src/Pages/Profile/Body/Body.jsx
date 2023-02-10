import React, { useContext } from "react";
import "./style.css";
import { AuthContext } from "../../../ContextHook/AuthContext";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import BookmarkBorderSharpIcon from "@mui/icons-material/BookmarkBorderSharp";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
const Body = () => {
    // Accessing the currentUser value from the AuthContext
    const { currentUser, userInfo } = useContext(AuthContext);
    const postListNav = Array.from(
        document.querySelectorAll(".post_list_item")
    );
    const postListContent = Array.from(
        document.querySelectorAll(".post_list_body_item")
    );
    postListNav.forEach((item, index) => {
        item.addEventListener("click", () => {
            for (let i = 0; i < postListNav.length; i++) {
                if (i !== index) {
                    postListNav[i].classList.remove("active");
                    postListContent[i].classList.remove("active");
                }
            }
            postListNav[index].classList.add("active");
            postListContent[index].classList.add("active");
        });
    });
    return (
        <>
            {userInfo.map((user, index) => {
                return user.listUserInfo.displayName ===
                    currentUser.displayName ? (
                    <div className="profile_body" key={index}>
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
                                    <span>{user.listUserInfo.posts_count}</span>
                                </div>
                                <div className="profile_info">
                                    <h1>Following</h1>
                                    <span>{user.listUserInfo.following}</span>
                                </div>
                                <div className="profile_info">
                                    <h1>Followers</h1>
                                    <span>{user.listUserInfo.followers}</span>
                                </div>
                            </div>
                        </div>

                        <div className="profile_post_list_container">
                            <nav className="post_list_header">
                                <div className="post_list_item active">
                                    <GridOnOutlinedIcon className="post_list_nav_icon" />
                                    <span>Posts</span>
                                </div>
                                <div className="post_list_item">
                                    <BookmarkBorderSharpIcon className="post_list_nav_icon" />
                                    <span>Saved</span>
                                </div>
                                <div className="post_list_item">
                                    <AssignmentIndOutlinedIcon className="post_list_nav_icon" />
                                    <span>Tags</span>
                                </div>
                            </nav>
                        </div>
                        <div className="post_list_body_container">
                            <div className="post_list_body_item active">
                                {user.listUserInfo.posts_count === 0
                                    ? <div className="no_post">No post to show</div>
                                    : user.posts.map((post, i) => {
                                          return (
                                              <div
                                                  className="post_list_box"
                                                  key={i}>
                                                  <img
                                                      src={post.image_url}
                                                      alt=""
                                                  />
                                              </div>
                                          );
                                      })}
                            </div>
                            <div className="post_list_body_item">
                                {user.listUserInfo.saved_count === 0
                                ? <div className="no_post">No Saved Post</div>
                                :
                                user.saved.map((save, j) => {
                                    return (
                                        <div className="post_list_box" key={j}>
                                            <img src={save.image_url} alt="" />
                                        </div>
                                    );
                                })
                                }
                            </div>
                            <div className="post_list_body_item">
                                <p>tagged</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: "none" }}></div>
                );
            })}
        </>
    );
};

export default Body;
